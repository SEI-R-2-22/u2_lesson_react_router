import React, { Component } from 'react';

export default class BoatCard extends Component {
  render() {
    const {boat} = this.props
    return (
      <div className="boat-card" onClick={() => this.props.showBoat(boat)}>
        <img style={{display: 'block'}} src={boat.img} alt={boat.name} />
        <h3>{boat.name}</h3>
      </div>
    );
  }
}