import { useNavigate } from 'react-router-dom'

const Listings = (props) => {

  let navigate = useNavigate()

  const showBoat = (boat) => {
    navigate(`${boat.id}`)
  }

  return (
    <div className="boat-grid">
      {
      props.boats.map((boat) => (
        <div className="boat-card" onClick={() => showBoat(boat)} key={boat.id}>
          <img style={{ display: 'block' }} src={boat.img} alt={boat.name} />
          <h3>{boat.name}</h3>
        </div>
      ))}
    </div>
    
  )
}

export default Listings
