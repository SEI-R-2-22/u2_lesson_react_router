import React, {Component} from 'react'
import data from '../FakeData.json'

export default class Post extends Component {
  render() {
    const post = data.find((post) => post.id === parseInt(this.props.match.params.post_id));
    
    return (
      <div className="post">
        <div className="hero">
          <img src={post.image} alt="post banner" />
        </div>
        <div className="content">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      </div>
    );
  }
}

