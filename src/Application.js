/**
 * Created by Charles Toller on 12/18/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.js';
import CueTypes from './CueTypes.js';
import Headline from './Headline.js';
export default class Application extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Headline />
                <div style={{height:"18.75pt"}} />
                <CueTypes/>
                <div style={{height:"14.75pt"}} />
                <Table />
            </div>
        )
    }
}
ReactDOM.render(<Application/>,document.getElementById('application'));