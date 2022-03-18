import { useState } from 'react'
import boatsArray from './data/boats'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import Listings from './components/Listings'
import BoatDetails from './components/BoatDetails'
import BoatForm from './components/BoatForm'

const App = () => {
  // The boatsArray is passed into state as the initial state for 'boats' in App.js
  const [boats, setBoats] = useState(boatsArray)
  const [newBoat, setNewBoat] = useState({
    id: '',
    name: '',
    img: '',
    description: '',
    price: ''
  })

  const addBoat = (e) => {
    e.preventDefault()
    const currentBoats = boats
    const createdBoat = {
      ...newBoat,
      id: parseInt(boats.length + 1),
      price: parseInt(newBoat.price)
    }
    currentBoats.push(createdBoat)
    setBoats(currentBoats)
    setNewBoat({ id: '', name: '', img: '', description: '', price: '' })
  }

  const handleChange = (e) => {
    setNewBoat({ ...newBoat, [e.target.name]: e.target.value })
  }

  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path='/listings' element={ <Listings boats={boats} /> } />
          <Route path='/listings/:id' element={ <BoatDetails boats={boats} /> } />
          <Route path='/new' element={ <BoatForm newBoat={newBoat} handleChange={handleChange} addBoat={addBoat} /> } />
        </Routes>
      </main>
    </div>
  )
}

export default App
