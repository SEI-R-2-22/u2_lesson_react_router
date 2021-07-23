import React from 'react'
import BoatCard from '../components/BoatCard'

function Listings(props) {
  showBoat = (boat) => {}
  const boatListings = props.boats.map((boat) => {
    return (
      <BoatCard
        key={`${boat.id}${boat.name}`}
        showBoat={showBoat}
        boat={boat}
      />
    )
  })

  return <div className="listings">{boatListings}</div>
}

export default Listings
