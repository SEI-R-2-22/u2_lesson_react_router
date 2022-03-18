import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BoatDetails = (props) => {

  const [boat, setBoat] = useState('')

  let { id } = useParams()

  useEffect(() => {
    let selectedBoat = props.boats.find(
      (boat) => boat.id === parseInt(id)
    )
    setBoat(selectedBoat)
  }, [props.boats, id])

  return boat ? (
    <div className="detail">
      <div className="detail-header">
        <img src={boat.img} alt={boat.name} />
        <div style={{minWidth: '30em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h1>{boat.name}</h1>
        </div> 
      </div>
      <div className="info-wrapper">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h3>Price: ${boat.price}</h3>
          <h3>Boat ID: {boat.id}</h3>
        </div>
        <p>{boat.description}</p>
      </div>
    </div>
  ) : null;
}

export default BoatDetails
