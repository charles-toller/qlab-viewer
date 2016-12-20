/**
 * Created by Charles Toller on 12/19/2016.
 */
import React from 'react';
class CueTypeBox extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let types = this.props.cueTypes.split("").map((type,i,arr)=>{
            return (
                <div className="inline" style={{width:(100/arr.length)+"%"}}>
                    <span className="qicons" style={{fontSize:"16pt"}}>{type}</span>
                </div>
            )
        });
        return (
            <div className="roundedSquare inline" style={{width:this.props.width,height:"19.7pt"}}>
                {types}
            </div>
        )
    }
}
class Spacer extends React.Component {
    render() {
        return (
            <div className="inline" style={{width:"6pt"}}>

            </div>
        )
    }
}
export default class CueTypes extends React.Component {
    render() {
        return (
            <div style={{width:"100%",textAlign:"center",marginBottom:""}}>
                <div style={{margin:"0 auto"}}>
                    <CueTypeBox width="29.3pt" cueTypes="g"/>
                    <Spacer/>
                    <CueTypeBox width="48.96pt" cueTypes="am"/>
                    <Spacer/>
                    <CueTypeBox width="71.05pt" cueTypes="vct"/>
                    <Spacer/>
                    <CueTypeBox width="21.81pt" cueTypes="f"/>
                    <Spacer/>
                    <CueTypeBox width="92.93pt" cueTypes="oMFT"/>
                    <Spacer/>
                    <CueTypeBox width="213.81pt" cueTypes="sSplrdGEADweC"/>
                </div>
            </div>
        )
    }
}