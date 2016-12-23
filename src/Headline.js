/**
 * Created by Charles Toller on 12/19/2016.
 */
import React from 'react';
export default class Headline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTitle:"",
            author:"",
            tagLine:""
        }
    }
    onChange(stateItem,e) {
        let obj = {};
        obj[stateItem] = e.target.value;
        this.setState(obj);
    }
    render() {
        return (
            <div>
                <div className="print-only">
                    <span style={{fontFamily:"Calluna Sans",fontSize:"12pt",color:"red"}}>{this.state.showTitle}</span>
                    <span style={{fontFamily:"Calluna Sans",fontSize:"12pt",color:"gray"}}> - {this.state.author} - {this.state.tagLine}</span>
                </div>
                <div className="screen-only">
                    <div>
                        <label>Show Title</label>
                        <input value={this.state.showTitle} onChange={this.onChange.bind(this,'showTitle')} />
                    </div>
                    <div>
                        <label>Author</label>
                        <input value={this.state.author} onChange={this.onChange.bind(this,'author')} />
                    </div>
                    <div>
                        <label>Tagline</label>
                        <input value={this.state.tagLine} onChange={this.onChange.bind(this,'tagLine')} />
                    </div>
                </div>
            </div>
        )
    }
}