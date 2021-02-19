import React, { Component } from 'react'
import data from '../FakeData.json'
import PostCard from '../components/PostCard.js'

export default class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.setState({ posts: data })
  }

  render() {
    return (
      <div className="posts">
        {this.state.posts.map((post) => (
          <PostCard key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            // history={history}
          />
        ))}
      </div>
    )
  }
}
