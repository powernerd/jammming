import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Come Down To Us',
        artist: 'Burial',
        album: 'Rival Dealer - EP'
      }, {
        name: 'Temple Sleeper',
        artist: 'Burial',
        album: 'Temple Sleeper - Single'
      }, {
        name: 'Young Death',
        artist: 'Burial',
        album: 'Young Death / Nightmarket - EP'
      }],
      playlistName: 'Burial\'s New Hotness',
      playlistTracks: [{
        name: 'Come Down To Us',
        artist: 'Burial',
        album: 'Rival Dealer - EP'
      }, {
        name: 'Temple Sleeper',
        artist: 'Burial',
        album: 'Temple Sleeper - Single'
      }, {
        name: 'Young Death',
        artist: 'Burial',
        album: 'Young Death / Nightmarket - EP'
      }]
    }
  }
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
