import React, { Component } from 'react';

export default class TextInput extends Component {
  render() {
    return (
      <input 
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}