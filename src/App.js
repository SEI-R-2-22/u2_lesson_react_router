import { useState } from 'react'
import boatsArray from './data/boats'
import './styles/App.css'

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
        {/* Import Nav here */}
      </header>
      <main>
        {/* Create Routes to components here */}
      </main>
    </div>
  )
}

export default App
