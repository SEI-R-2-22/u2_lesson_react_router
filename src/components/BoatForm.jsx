const BoatForm = (props) => {
  
  const handleSubmit = (e) => {
    props.addBoat(e)

  }

  const newBoat = props.newBoat

  return (
    <div>
    <h1>Add A New Boat Listing</h1>
    <form onSubmit={ handleSubmit }>
      <input type="text" value={newBoat.name} onChange={ props.handleChange} name={'name'} placeholder={'name'} />
      <input type="text" value={newBoat.img} onChange={ props.handleChange} name={'img'} placeholder={'image'} />
      <input type="text-area" value={newBoat.description} onChange={ props.handleChange} name={'description'} placeholder={'description'} />
      <input type="text" value={newBoat.price} onChange={ props.handleChange} name={'price'} placeholder={'price'} />
      <button>Submit</button>
    </form>
    </div>
  );
}

export default BoatForm
