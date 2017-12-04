const clientID = '1498ac447abd47a1b28fb43f1d33f3d8';
const redirectURL = 'http://localhost:3000/';
let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken: function() {
    if (accessToken) return accessToken;
    // check the URL to see if it has just been obtained.
    const re_Token = /access_token=([^&]*)/;
    const re_Expires = /expires_in=([^&]*)/;
    let urlToken = window.location.href.match(re_Token);
    let urlExpires = window.location.href.match(re_Expires);
    if (urlToken) {
      // Set the token and expiration
      accessToken = urlToken[1];
      expiresIn = urlExpires[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
    }
  },
  search: function(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      // map the converted JSON to an array of tracks
      return jsonResponse.tracks.items.map(track => {
        return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
    });
  },
  savePlaylist: function(name, tracks) {
    // The .savePlaylist() method accepts a playlist name and an array of track URIs.
    // It makes the following three requests to the Spotify API:
    // GET current user's ID
    // POST a new playlist with the input name to the current user's Spotify account.
    // Receive the playlist ID back from the request.
    // POST the track URIs to the newly-created playlist, referencing the current user's
    // account (ID) and the new playlist (ID)
    if (!name) return;
    if (!tracks) return;

    let _accessToken = accessToken;
    let _headers = {
      Authorization: `Bearer ${_accessToken}`,
      'Content-Type': 'application/json'
    };
    let _userID;

    //GET the users ID for a future request
    return fetch('https://api.spotify.com/v1/me', {
      headers: _headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      _userID = jsonResponse.id;
        // Make a POST request that creates a new playlist in the user's account
        // and returns a playlist ID.
      let data = JSON.stringify({
        name: name,
        public: true,
        collaborative: false,
        description: 'Playlist created using Jammming with Robert.'
      })
      return fetch(`https://api.spotify.com/v1/users/${_userID}/playlists`, {
        headers: _headers,
        method: 'POST',
        body: data
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        let _playlistID = jsonResponse.id;
        // Now we can add the tracks
        // Set the URIs parameter to an array of track URIs passed into the method.
        let data = JSON.stringify({
          uris: tracks
        })
        return fetch(`https://api.spotify.com/v1/users/${_userID}/playlists/${_playlistID}/tracks`, {
          headers: _headers,
          method: 'POST',
          body: data
        })
      })
    });
  }
}
export default Spotify;
