/**
 * Created by Charles Toller on 12/18/2016.
 */
import React from 'react';
export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cues:require("./../cues.js")
        };
        this.typeLookup = {
            audio:"a",
            group:"g",
            arm:"A",
            camera:"c",
            script:"C",
            devamp:"d",
            disarm:"D",
            memo:"e",
            target:"E",
            fade:"f",
            midiFile:"F",
            goto:"G",
            load:"l",
            mic:"m",
            midi:"M",
            osc:"o",
            pause:"p",
            reset:"r",
            start:"s",
            stop:"S",
            titles:"t",
            timecode:"T",
            video:"v",
            wait:"w"
        };
        this.continueLookup = ["","U","W"];
        this.canvas = document.createElement('canvas');
    }
    getWidthOfTextAtFont(text,font) {
        let context = this.canvas.getContext("2d");
        context.font = font;
        let metrics = context.measureText(text);
        return metrics.width;
    }
    renderTimeFromSeconds(seconds) {
        if(!seconds && seconds !== 0) {
            return "";
        }
        let minutes = "" + Math.floor(seconds / 60);
        while(minutes.length < 2) {
            minutes = "0" + minutes;
        }
        let secs = "" + Math.floor(seconds % 60);
        while(secs.length < 2) {
            secs = "0" + secs;
        }
        let millis = "" + Math.round((seconds % 1) * 100);
        while(millis.length < 2) {
            millis = "0" + millis;
        }
        return minutes + ":" + secs + "." + millis;
    }
    renderCueTree(tree,indentLevel) {
        console.log("running renderCueTree at indentLevel "+indentLevel);
        let y = tree.map((cue)=>{
            let a = [];
            let targetWidth = 9;
            while(this.getWidthOfTextAtFont(cue.target,targetWidth+"pt 'Calluna Sans'") > 96) {
                console.log(cue.target+" too large! currently "+this.getWidthOfTextAtFont(cue.target,targetWidth+"pt 'Calluna Sans'")+"px wide");
                targetWidth -= .1;
            }
            console.log("done finding width for target "+cue.target+", size: "+targetWidth+" for a final width of "+
            this.getWidthOfTextAtFont(cue.target,targetWidth+"pt 'Calluna Sans'"));
            a.push(
                <tr>
                    <td className="activeSelector" />
                    <td className="type qicons">{this.typeLookup[cue.type]}</td>
                    <td className="number">{cue.number}</td>
                    {(()=>{
                        let b = [];
                        for(let i = 0;i<indentLevel;i++) {
                            b.push(
                                <td className="indent" />
                            )
                        }
                        return b;
                    })()}
                    <td colSpan={"" + (5-indentLevel)} className="cueName">{cue.name}</td>
                    <td className="target" style={{fontSize:targetWidth+"pt"}}>{cue.target}</td>
                    <td className="preWait">{this.renderTimeFromSeconds(cue.preWait)}</td>
                    <td className="action">{this.renderTimeFromSeconds(cue.action)}</td>
                    <td className="postWait">{this.renderTimeFromSeconds(cue.postWait)}</td>
                    <td className="autoContinue qicons">{this.continueLookup[cue.continueMode]}</td>
                </tr>
            );
            if(cue.type == "group") {
                a = a.concat(this.renderCueTree(cue.children,indentLevel+1));
            }
            return a;
        });
        return y;
    }
    render() {
        return (
            <table className="cueTable">
                <thead>
                <tr>
                    <th className="cuesHeader activeSelector" />
                    <th className="qicons cuesHeader type" />
                    <th className="cuesHeader number">#</th>
                    <th className="cuesHeader indent">Q</th>
                    <th className="cuesHeader indent" />
                    <th className="cuesHeader indent" />
                    <th className="cuesHeader indent" />
                    <th className="cuesHeader cueName" />
                    <th className="cuesHeader target">target</th>
                    <th className="cuesHeader preWait">prewait</th>
                    <th className="cuesHeader action">action</th>
                    <th className="cuesHeader postWait">postwait</th>
                    <th className="qicons cuesHeader autoContinue">U</th>
                </tr>
                </thead>
                <tbody className="striped">
                {this.renderCueTree(this.state.cues,0)}
                </tbody>
            </table>
        )
    }
}