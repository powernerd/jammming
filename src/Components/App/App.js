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
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
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
    let tracks = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, tracks).then(() => {
      //Reset the state when done saving.
      this.setState({
        searchResults: [],
        playlistTracks: []
      })
      // Set the playlist name to empty.
      document.getElementsByClassName("Playlist-name")[0].value = 'New Playlist';
    });
  }
  search(term) {
    Spotify.search(term).then(results => {
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
