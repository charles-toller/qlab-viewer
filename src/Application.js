/**
 * Created by Charles Toller on 12/18/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.js';
import CueTypes from './CueTypes.js';
import Headline from './Headline.js';
import Setup from './Setup.js';
let $ = require('jquery');
export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cues:[]
        };
    }
    renderWorkspace(ip,workspace) {
        $.ajax(window.location.origin+"/"+ip+"/"+workspace+"/cueData",{
            success:(data)=> {
                this.setState({
                    cues:JSON.parse(data)
                });
            },
            dataType:"text"
        });
    }
    render() {
        if(this.state.cues.length > 0) {
            return (
                <div>
                    <Headline />
                    <div style={{height: "18.75pt"}}/>
                    <CueTypes/>
                    <div style={{height: "14.75pt"}}/>
                    <Table cues={this.state.cues}/>
                </div>
            )
        }
        else {
            return (
                <Setup renderWorkspace={this.renderWorkspace.bind(this)}/>
            )
        }
    }
}
ReactDOM.render(<Application/>,document.getElementById('application'));