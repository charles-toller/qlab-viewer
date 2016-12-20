/**
 * Created by Charles Toller on 12/19/2016.
 */
import React from 'react';
export default class Headline extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <span style={{fontFamily:"Calluna Sans",fontSize:"12pt",color:"red"}}>Once Upon A Mattress</span>
                <span style={{fontFamily:"Calluna Sans",fontSize:"12pt",color:"gray"}}> - Charles Toller -
                Performed in October 2015 at the Vail Theatre of the Arts</span>
            </div>
        )
    }
}