import React, {Component} from 'react'

export default class PostCard extends Component {
  render() {
    return (
      <div className="item" key={this.props.id}>
        <img src={this.props.image} alt="Post banner" />
        <div className="modal">
          <h3>{this.props.title}</h3>
          <button>Read More</button>
        </div>
      </div>
    );
  }
}

