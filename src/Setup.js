/**
 * Created by Charles on 12/21/2016.
 */
import React from 'react';
let $ = require('jquery');
export default class Setup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip:"",
            workspaces:[],
            selectedWorkspace:""
        };
    }
    onChange(stateItem,e) {
        let obj = {};
        obj[stateItem] = e.target.value;
        this.setState(obj);
    }
    findWorkspaces() {
        $.ajax(window.location.origin+"/"+this.state.ip+"/workspaces",{
            success:(data)=> {
                let workspaces = JSON.parse(JSON.parse(data).args[0]).data;
                this.setState({
                    workspaces
                });
            },
            dataType:"text"
        });
    }
    render() {
        if(this.state.workspaces.length === 0) {
            return (
                <div>
                    <div className="form-group">
                        <label>IP Address</label>
                        <input className="form-control" value={this.state.ip}
                               onChange={this.onChange.bind(this, 'ip')}/>
                    </div>
                    <button onClick={this.findWorkspaces.bind(this)}>Find Workspaces</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="form-group">
                        <label>IP Address</label>
                        <input className="form-control" value={this.state.ip}
                               onChange={this.onChange.bind(this, 'ip')}/>
                    </div>
                    <button onClick={this.findWorkspaces.bind(this)}>Find Workspaces</button>
                    <div className="form-group">
                        <label>Workspace</label>
                        <select className="form-control" value={this.state.selectedWorkspace} onChange={this.onChange.bind(this,'selectedWorkspace')}>
                            <option value="" />
                            {this.state.workspaces.map((item)=>{
                                return (
                                    <option value={item.uniqueID}>{item.displayName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button onClick={this.props.renderWorkspace.bind(this,this.state.ip,this.state.selectedWorkspace)}>Render Workspace</button>
                </div>
            )
        }
    }
}