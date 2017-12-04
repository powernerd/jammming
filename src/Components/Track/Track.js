import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    // Bind this!
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  // For a track in the search results show a +
  // For a track in the playlist show a -
  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    }
    return <a className="Track-action" onClick={this.addTrack}>+</a>;
  }
  // Add this track to the playlist. See App/App.js
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  // Remove this track from the playlist. See App/App.js
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
