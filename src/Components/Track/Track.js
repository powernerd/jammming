import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    // Bind this!
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction(isRemoval) {
    // Create a method called renderAction that displays a - anchor tag if the
    // isRemoval property is true, and a + anchor tag if the isRemoval property
    // is false. Set the class name to Track-action.
    return (isRemoval) ? '-' : '+';
  }
  addTrack() {
    this.props.onAdd(this.props.track);
  }
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
        <a className="Track-action" onClick={this.addTrack}>+</a>
        <a className="Track-action" onClick={this.removeTrack}>-</a>
      </div>
    );
  }
}

export default Track;
