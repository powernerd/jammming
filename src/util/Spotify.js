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
  }
}
export default Spotify;
