import React from 'react'

const Listings = (props) => {

  const showBoat = (boat) => {

  }

  return (
    <div>
      {
      props.boats.map((boat) => (
        <div className="boat-card" onClick={() => showBoat(boat)}>
          <img style={{ display: 'block' }} src={boat.img} alt={boat.name} />
          <h3>{boat.name}</h3>
        </div>
      ))}
    </div>
    
  )
}

export default Listings
