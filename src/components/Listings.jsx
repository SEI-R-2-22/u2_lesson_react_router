import { useNavigate, Link } from 'react-router-dom'

const Listings = (props) => {

  let navigate = useNavigate()

  return (
    <div>
      <div className="boat-grid">
        {
        props.boats.map((boat) => (
          <Link to={`/listings/${boat.id}`}>
            <div className="boat-card" key={boat.id}>
              <img style={{ display: 'block' }} src={boat.img} alt={boat.name} />
              <h3>{boat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/"><button>Back</button></Link>
    </div>
  )
}

export default Listings
