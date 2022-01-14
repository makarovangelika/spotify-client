import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Habibi',
          artist: 'Tamino',
          album: 'Amir',
          id: 1
        },
        {
          name: 'Forget her',
          artist: 'Jeff Buckley',
          album: 'Grace',
          id: 2
        },
        {
          name: 'Supremacy',
          artist: 'Muse',
          album: 'The 2nd Law',
          id: 3
        }
      ],
      playlistName: 'My playlist',
      playlistTracks: [
        {
          name: 'So it goes',
          artist: 'Tamino',
          album: 'Amir',
          id: 4
        },
        {
          name: 'Goliath',
          artist: 'Woodkid',
          album: 'S16',
          id: 5
        },
        {
          name: 'Habibi',
          artist: 'Tamino',
          album: 'Amir',
          id: 1
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(track) {
    let inPlaylist = this.state.playlistTracks.some(trackInPlaylist => track.id === trackInPlaylist.id);
    if (inPlaylist) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({
      playlistTracks: this.state.playlistTracks
    });
  }
  removeTrack(track) {
    let updatedPlaylist = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({
      playlistTracks: updatedPlaylist
    })
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              />
            <Playlist
              playlistName ={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
