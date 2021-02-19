import React, {Component} from 'react'

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div>
          <h1>
            Welcome to {this.props.name || <strong>Insert Name Here</strong>}'s Blog
          </h1>
        </div>
        <section className="flip-card">
          <div className="inner">
            <div className="front">
              <img
                src="https://images.unsplash.com/photo-1536060316316-2466bda904f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
                alt="You got this"
              />
            </div>

            <div className="back">
              <img
                src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=" Work Hard"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

