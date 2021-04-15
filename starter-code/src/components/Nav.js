import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <h4>Starboard</h4>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/listings">Boats</NavLink>
          <NavLink to="/new">New Boat</NavLink>
        </div>
      </nav>
    );
  }
}