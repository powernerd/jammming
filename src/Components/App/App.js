import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

class App extends React.Component {
  componentWillMount() {
    // Connect to spotify
    Spotify.getAccessToken();
  }
  constructor(props) {
    super(props);
    // Define the default state
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
  }

  // Method for adding a track to the playlist on the right / below
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    // Don't let users add a song more than once.
    if (!tracks.includes(track)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    } else {
      console.log('Duplicate. Track not added.');
    }
  }

  // Method for removing a track.
  removeTrack(track) {
    // Remove the track instance from the playlistTracks array by filtering the ID.
    let trackList = this.state.playlistTracks.filter(playlistTrack => {
      return playlistTrack.id !== track.id;
    })
    this.setState({playlistTracks: trackList});
  }
  // Method for setting the playlist name
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }
  // Method for searching the spotify library. See util/Spotify.js
  search(term) {
    // search is Promise based (thenable), set the state when the Promise is fulfilled
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    });
  }
  // Method for saving the playlist to spotify. See util/Spotify.js
  savePlaylist() {
    // Get a list of track URIs provided by Spotify, these are needed for defining the playlist
    let tracks = this.state.playlistTracks.map(track => track.uri);
    // savePlaylist is Promise based. Once the playlist is saved, reset the application state.
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
