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
          id: 1
        },
        {
          name: 'Goliath',
          artist: 'Woodkid',
          album: 'S16',
          id: 2
        },
        {
          name: 'Each time',
          artist: 'Tamino',
          album: 'Amir',
          id: 3
        }
      ]
    }
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
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist
              playlistName ={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
