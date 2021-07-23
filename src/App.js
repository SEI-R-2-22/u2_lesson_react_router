import React, { useState } from 'react'
import { boats as boatArr } from './data/boats'
import './styles/App.css'
// imports here

// The boatArr is passed into state as the initial state for 'boats' in App.js

function App() {
  const [boats, setBoats] = useState(boatArr)
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
    const newBoat = {
      ...newBoat,
      id: parseInt(boats.length + 1),
      price: parseInt(newBoat.price)
    }
    currentBoats.push(newBoat)
    setBoats(currentBoats)
    setNewBoat({ id: '', name: '', img: '', description: '', price: '' })
  }

  const handleChange = (e) => {
    setNewBoat({ ...newBoat, [e.target.name]: e.target.value })
  }

  return (
    <div className="App">
      <header>{/* Import Nav here */}</header>
      <main>{/* Create Routes to page components here */}</main>
    </div>
  )
}

export default App
