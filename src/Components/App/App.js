import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        id: 4,
        name: 'Street Halo',
        artist: 'Burial',
        album: 'Street Halo',
        uri: 'asdf'
      }, {
        id: 5,
        name: 'Hiders',
        artist: 'Burial',
        album: 'Rival Dealer - EP',
        uri: 'asdf'
      }, {
        id: 6,
        name: 'Southern Comfort',
        artist: 'Burial',
        album: 'South London Boroughs - EP',
        uri: 'asdf'
      }],
      playlistName: 'Burial\'s Hotness',
      playlistTracks: [{
        id: 1,
        name: 'Come Down To Us',
        artist: 'Burial',
        album: 'Rival Dealer - EP',
        uri: 'asdf'
      }, {
        id: 2,
        name: 'Temple Sleeper',
        artist: 'Burial',
        album: 'Temple Sleeper - Single',
        uri: 'asdf'
      }, {
        id: 3,
        name: 'Young Death',
        artist: 'Burial',
        album: 'Young Death / Nightmarket - EP',
        uri: 'asdf'
      }]
    }
    // Bind this!
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    // Connect spotify
    Spotify.getAccessToken();
  }
  addTrack(track) {
    let isDuplicate = this.state.playlistTracks.some(playlistTrack => {
      return playlistTrack.id === track.id;
    })
    if (!isDuplicate) {
      let trackList = this.state.playlistTracks;
      trackList.push(track);
      this.setState({playlistTracks: trackList});
      console.log('Track added.');
    } else {
      console.log('Duplicate. Track not added.');
    }
  }
  removeTrack(track) {
    let trackList = this.state.playlistTracks.filter(playlistTrack => {
      return playlistTrack.id !== track.id;
    })
    this.setState({playlistTracks: trackList});
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    // More later
  }
  search(term) {
    console.log('Search: '+term);
    // More later
    Spotify.search(term).then(results => {
      console.log('results: '+results)
      this.setState({searchResults: results});
    });
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
