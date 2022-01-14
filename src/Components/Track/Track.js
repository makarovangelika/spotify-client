import React from 'react';
import './Track.css';

export class Track extends React.Component {
    renderAction() {
        let button = this.props.isRemoval ? '-' : '+';
        return button;
    }
    render() {
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3></h3>
                    <p></p>
                </div>
                <button className='Track-action'>{this.renderAction()}</button>
            </div>
        );
    }
}