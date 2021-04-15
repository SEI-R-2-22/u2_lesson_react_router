import React, { Component } from 'react';
import TextInput from '../components/TextInput';

export default class BoatForm extends Component {
  
  handleSubmit = (e) => {
    this.props.addBoat(e)
    this.props.history.push('/listings')
  }

  render() {
    const newBoat = this.props.newBoat
    return (
      <div>
      <h1>Add A New Boat Listing</h1>
      <form onSubmit={this.handleSubmit}>
        <TextInput type="text" value={newBoat.name} onChange={this.props.handleChange} name={'name'} placeholder={'name'} />
        <TextInput type="text" value={newBoat.img} onChange={this.props.handleChange} name={'img'} placeholder={'image'} />
        <TextInput type="text-area" value={newBoat.description} onChange={this.props.handleChange} name={'description'} placeholder={'description'} />
        <TextInput type="text" value={newBoat.price} onChange={this.props.handleChange} name={'price'} placeholder={'price'} />
        <button>Submit</button>
      </form>
      </div>
    );
  }
}