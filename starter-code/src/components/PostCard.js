import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class PostCard extends Component {
  render() {
    return (
      <Link to={`/posts/${this.props.id`}>
      <div className="item" key={this.props.id}>
        <img src={this.props.image} alt="Post banner" />
        <div className="modal">
          <h3>{this.props.title}</h3>
          <button>Read More</button>
        </div>
      </div>
      </Link>
    );
  }
}

