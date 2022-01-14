import React from 'react';
import {Track} from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component {
    render() {
        let tracks = this.props.tracks;
        return (
            <div className='TrackList'>
                {tracks.map(track => {
                    return <Track key={track.id} track={track} />
                })}
            </div>
        );
    }
}