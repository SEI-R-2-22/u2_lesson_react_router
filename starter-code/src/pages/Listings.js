import React, { Component } from 'react';
import BoatCard from '../components/BoatCard';

export default class Listings extends Component {
  
  showBoat = (boat) => {
    this.props.history.push(`/listings/${boat.id}`)
  }

  render() {
    const boatListings = this.props.boats.map(boat => {
      return <BoatCard key={`${boat.id}${boat.name}`} showBoat={this.showBoat} boat={boat} />
    })

    return (
      <div className="listings">
        {boatListings}
      </div>
    );
  }
}