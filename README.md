# React Router

![](react-router.png)

## Overview

Up to this point, our React applications have been limited in size, allowing us to use basic control flow in our components' render methods to determine what gets rendered to our users. However, as our React applications grow in size and scope, we need an easier and more robust way of rendering different components. Additionally, we will want the ability to set information in the url parameters to make it easier for users to identify where they are in the application.

React Router, while not the only, is the most commonly-used routing library for React. It is relatively straightforward to configure and integrates with the component architecture nicely (itself being nothing but a collection of components). Once configured, it essentially serves as the root component in a React application and renders other application components within itself depending on the path in the url.


## Lesson Objectives
- Learn about routing with react
- Use React Router to map URLs to components
- Use React Router to create links to different pages

## Getting Started
You've been provided with starter code and components. Do not modify any of the provided code besides `App.js`.
- `Fork` and `clone` this repository.
- `cd` into the `starter-code` directory.
- Run `npm install` to install our necessary packages.


## Instructions
### What is React Router?

React Router makes it easy for us to route URLs - not to different pages, but by dynamically loading different components on the same page as the user navigates to different URLs. Once we define how the URLs are routed to the components, React Router will manage our Single Page Application (SPA) `browser history` automatically. SPAs are web apps which load different sections of a website within the same page. The user feels as though they've never left the homepage because links swap out content and replace it with new content.

### React Router Setup

First, we need to install `react-router-dom` and save it as a dependency to `package.json`.

```sh
npm install --save react-router-dom
```

To configure our current application to use React Router, we need to modify the entry to our app in `index.js`. We need to bring in the `Router` component and allow it to be the root component of our application. `Router` will, in turn, render `App` through which all the rest of our components will be rendered:

```js
import { BrowserRouter as Router } from 'react-router-dom'

// ...

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

Note that we are aliasing <code>BrowserRouter</code> as `Router` here for simplicity

<details closed>
<summary>
  What is Aliasing
</summary>
<br>

Aliasing is when we import a package by a different name such as the above. Here, instead of using <code>BrowserRouter</code> we "change" the name to <code>Router</code>. We can now use <code>Router</code> instead of a long name such as <code>BrowserRouter</code>.

</details>
<br>

By making `Router` the root component of our app, all child components, including `App` will have access to a `history` object through which information like the current location and url can be accessed or changed. Additionally, in order to use the other routing components provided by React Router, a `Router` ancestor component is necessary.

Next, in `App.js`, we need to import all of the components we want to use in our app. We'll also need to import `NavLink` and `Route` components from `react-router-dom`:

```js
// src/App.js
import './App.css'
import { Route, NavLink } from 'react-router-dom';
import Home from './screens/Home';
import Posts from './screens/Posts';
import About from './screens/About';
import Post from './screens/Post';
```

___
### Modifying App's `return` Statement

Now that we have access to these components, we need to modify the `App` component's `return` statement to set up navigation. Think of `App.js` as an entry point for our application that will control the flow of URL routes and links.

A common structure for using `react-router` in our `App.js` file is:

```js
// src/App.js

return (
  <div classname="App">
    <nav>
      <NavLink to=""></NavLink>
      <NavLink to=""></NavLink>
    </nav>
    <main>
      <Route path="" render={} />
    </main>
  </div>
)
```

- Wrapping navigation links in a `<nav>` used as a wrapper. This allows us to have most major site links available in one accessible place.
- Use a `<main>` tag to wrap all content that will be served up by our `<Route>`s. This way, a proper semantic tag can be used to control the layout of our application while the various components that will render within it.

While `React Router` has many availble available properties and components, we'll be using only a few to build our apps.

- **`Link`** - a component for setting the URL and providing navigation between different components in our app without triggering a page refresh. It takes a `to` property, which sets the URL to whatever path is defined within it. Link can also be used inside of any component that is connected to a `Route`.

- **`NavLink`** - is a component that works the same as **`Link`**, except it makes more properties available to us for styling and detecting which page we're on.

- **`Route`** - a component that connects a certain `path` in the URL with the relevant component to `render` at that location.

- **`Switch`** - a component used as a wrapper for `Route` components. The `Switch` component gives us control over which routes are currently being rendered.


___
### Route render methods

You'll notice, in the first example we used `render` in our Route; however, this is not the only prop that the `Route` component can use to render content. This is because there are three ways to render something using a `<Route>`:
```jsx
// component
<Route component={} />
// render
<Route render={} />
// children
<Route children={} />
```
-  All three route render methods will be passed [`match`](https://reacttraining.com/react-router/web/api/match), [`location`](https://reacttraining.com/react-router/web/api/location), and [`history`](https://reacttraining.com/react-router/web/api/history) props. We won't be covering `<Route children>` for the scope of this class.

#### `<Route render={} />`

The render method uses inline rendering which means that the rendered content doesn't need to unmount or remount. You pass in a function to be called when the location matches rather than creating a `React.createElement`.

```js
// convenient inline rendering
<Route path="/home" render={() => <div>Home</div>}/>
<Route path="/find-puppy" render={(props) => (
             <SearchPuppies {...props}
               formQuery={this.state.formQuery}
               handleChange={this.handleChange}
               handleSubmit={this.handleSubmit}
             />
           )}
/>
```

#### `<Route component={} />`

Renders a component only when the requested location matches the path location. It renders with only the route props (`location`, `match`, and `history`) if no callback is provided.

```js
<Route path="/puppies/:puppyName" component={DisplayPuppy} />;

//The above would render the following component
DisplayPuppy(props) {
  return <h1>Awww {props.match.params.puppyName} is such a good pup!</h1>;
}
```

In this case, the `DisplayPuppy` component will recieve the `match`, `location`, and `history` props.

Looking deeper, the docs for the `component` method show us a little more about what is going on under the hood.

"When you use component (instead of `render` or `children`) the router uses `React.createElement` to create a new React element from the given component. That means if you provide an inline function to the component prop, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component."

To note: `<Route component>` takes precedence over `<Route render>` and both take precedence over `<Route children>` so don’t use more than one in the same `<Route>`.

All of these components have access to all the same route props (`location`, `match`, and `history`) as the other `Route` components; however, you can explicitly pass other props (like functions and variables in the `state` object of `App.js`) as arguments through to a component using the `render={}` `prop`.

### Putting It All Into Practice

To prove some of these concepts, let's link our `App.js` to one of our components.
First let's import `Route` from `react-router-dom` like this:

```js
import { Route } from 'react-router-dom'
```

Then add that `Route` between our `<main></main>` tags.

```js
<div className="App">
  <div className="links">
    <nav>// Code Goes Here</nav>
  </div>
  <main>
    <Route exact path="/" component={Home} />
  </main>
</div>
```

Great! Now head over to the `screens` folder and into `Home.js`
and add in a `console.log` **before the `return` statement**:

```js
import React, {Component} from 'react';

export default class Home extends Component {
  render() {

    console.log(this.props)

    return (
      <div className="home">
        <div>
          <h1>
            Welcome to {this.props.name || <strong>Insert Name Here</strong>}s Blog
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
```

Make sure to start your React server by running `npm start` in the starter code directory.

Head on over to your browser and open up your developer console. Open the console tab and let's see them props!

```
Object:
  history:
      action: "PUSH"
      block: ƒ block(prompt)
      createHref: ƒ createHref(location)
      go: ƒ go(n)
      goBack: ƒ goBack()
      goForward: ƒ goForward()
      length: 50
      listen: ƒ listen(listener)
      location: {pathname: "/", search: "", hash: "", state: null, key: "77e6kb"}
      push: ƒ push(path, state)
      replace: ƒ replace(path, state)
      __proto__: Object
  location:
      hash: ""
      key: "77e6kb"
      pathname: "/"
      search: ""
      state: null
      __proto__: Object
  match:
      isExact: true
      params: {}
      path: "/"
      url: "/"
      __proto__: Object
      name: "Bruno"
      staticContext: undefined
    __proto__: Object
```

Wowzers! That's a lot of props! And guess what, they all came from `React Router`. Neat!

But wait, if you take a look at `Home.js` you'll see that we're looking for a `prop` called **`name`**. How do we get that over there??

Well from what you know so far, we can pass `props` to components like this:

```js
<Home name="Owls" />
```

But, if we were to try that with our routes:

```js
<Route exact path="/" component={Home name='Owls'} />
```

You'll get a nice big red error message.

To pass `props` to a component we would need to do the following:
- Wrap the component in an anonymous function `() =>`
- Write the component like we would be rendering it in JSX inside the anonymous function

```js
<Route exact path="/" component={() => <Home name="Owls" />} />
```

Now our homepage should be displaying any name you entered as a prop.

But let's take a look at your console. You'll notice that we don't have all of the `props` available to us before. That's because we need to explicitly tell `React Router` that we need it's `props`.

We can do that by writing the following:

```js
<Route exact path="/" component={props => <Home {...props} name="Owls" />} />
```

Wait what.....

What we did here was pretty much tell `React Router`, "Hey um we need your props, would you mind handing them over?" 

When putting `props` inside of our callback function, we are telling `React Router` to send over it's props, then we make use of the `spread` operator(`...`) to say, take all of the props from `React Router` and send them down to our component. Now if you check your console's you'll notice that all of the `props` we have before are now available to us!

So now what is a `<Route/>` Component...

Let's stop here and take a look at the following code:

```js
<Route path="/puppies/:puppyName" component={DisplayPuppy} />;

//The above would render the following component
export default class DisplayPuppy extends Component {
  render() {
    return <h1>Awww {this.props.match.params.puppyName} is such a good pup!</h1>;
  }
}
```

I'll bet you're wondering what in the world is this `:puppyname`. This my friends is called a **`url parameter`**. 

Think of it as a placeholder for some sort of data that we can place there later on. Say for example I'm looking at pets on a website and I see this really cute puppy. I click on it and it takes me to that specific puppies page. Well now, how did we really do that, what is this hokus pokus stuff.

Whenever you display some sort of data, you'll usually have access to it's specific unique `id` or `name`. We can use one or both to look through our data and find that specific puppy!

We'll be making of use of this in the near future.

First let's get our navigation links set up, we'll be doing this using the `<NavLink>` component.
Import it from `React Router` like so:

> Note: We are using destructuring to pull these components from `React Router`!

```js
import { NavLink, Route } from 'react-router-dom'
```

Then add in the following code:

```js
<nav>
  <NavLink exact activeClassName="active" to="/">
    Home
  </NavLink>
  <NavLink exact to="/posts" activeClassName="active">
    Posts
  </NavLink>
</nav>
```

Your `App.js` should look like the following:

```js
return (
  <div className="App">
    <div className="links">
      <nav>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink exact to="/posts" activeClassName="active">
          Posts
        </NavLink>
      </nav>
    </div>

    <main>
      <Route
        exact
        path="/"
        component={props => <Home {...props} name="Owls" />}
      />
    </main>
  </div>
)
```

First let's display all of the posts on our blog and our home page. Add in the following line between the two `<main></main>` tags and after our first `<Route>`:

```js
<Route exact path="/posts" component={Posts} />
```

You should now have the following:

```jsx
<div className="App">
  <div className="links">
    <nav>
      <NavLink exact activeClassName="active" to="/">
        Home
      </NavLink>
      <NavLink exact to="/posts" activeClassName="active">
        Posts
      </NavLink>
    </nav>
  </div>

  <main>
    <Route exact path="/" component={() => <Home name="Owls" />} />
    <Route exact path="/posts" component={Posts} />
  </main>
</div>
```

Great, we can now hop over to the `Posts` page and view all of the posts.
Awesome, someone's been very busy writing I see!

Now let's actually set up our router so that we can view a specific post:
Add the following line in between the closing `<main>` tag and our `/posts` route.

```js
<Route exact path="/posts/:post_id" component={Post} />
```

You should have the following:

```js
<div className="App">
  <div className="links">
    <nav>
      <NavLink exact activeStyle={activeStyles} to="/">
        Home
      </NavLink>
      <NavLink exact to="/posts" activeStyle={activeStyles}>
        Posts
      </NavLink>
    </nav>
  </div>

  <main>
    <Route exact path="/" component={() => <Home name="Owls" />} />
    <Route exact path="/posts" component={Posts} />
    <Route exact path="/posts/:post_id" component={Post} />
  </main>
</div>
```

Welp theres that pesky `:post_id` thing again. Do you remember when I said "we'll make use of this in the near future"? Well, that time has arrived, let's see it in action!

Click on a specific post in the `/posts` page and pay close attention to the url bar. What do you notice?

Well for one, our url used to look a little like this:
`http://localhost:3000/posts`

Now it looks a little something like this: `http://localhost:3000/posts/3`.

The `:post_id` parameter is missing! Well, actually... it's not, remember when we mentioned that it was just a placeholder, well that's exactly what it is. A placeholder until we send a specific data point to navigate to. Now that we selected our data point `React Router` goes, "Oh so you want that specific item? No problem, I got you!" and badabing badaboom theres our specific blog post!

So you may have noticed that we've been using something called `exact` when writing our routes.
What exactly is `exact`?

`Exact` is a way for us to tell `React Router` that we want an **exact** match in our urls. So if I tell `React Router`, I want:

```js
<Route exact path='/all-dogs' component={AllDogs}>
```

I'm gonna get all the floofy dogs!
(Sorry cat lovers...)

### Implementing A `<Switch>` In Our Routes

What exactly is a `<Switch>`? Well as the name suggests it works exactly like a light switch. It prevents routes that we don't need at the current time from loading. Why would I need that you ask, well let me show you:

<img height="400" src='https://i1.wp.com/storage.googleapis.com/blog-images-backup/1*paiSxiVwaPH4McITwinmrg.gif?ssl=1'>

If you notice, theres multiple `Route`'s being rendered, well that's that not really ideal. All of these components are all rendering at the same time. The only thing is, you can't physically see them. They are kind of like a stack of papers on a desk, you can see whats on the top paper, but not the ones underneath. Say for example these components were handling quite a bit of data and logic, we would start running into performance issues due to all of the code being loaded at the same time. Our browsers would start hogging up all of our computer memory until it becomes unuseable. I don't know about you but, that doesn't sound like a good thing.

We can fix it using the `<Switch>` component which also comes with `React Router`!
Let's import our `<Switch>`:

```js
import { NavLink, Route, Switch } from 'react-router-dom'
```

and wrap it around our `Route` components:

```js
<Switch>
  <Route exact path="/" component={() => <Home name="Owls" />} />
  <Route exact path="/posts" component={Posts} />
  <Route exact path="/posts/:post_id" component={Post} />
</Switch>
```

Now jump into your developer console and look at your `React dev tools`:


You'll notice that now React is only rendering one of our `Route` components at a time! Much better!

### You Do: Add a Fourth Route

> 10 minute exercise / 5 minute review

Add in the `<About>` component and a `<Navlink>` for that page. Think about what your url path should be!
Experiment with passing various `props` through to the `<About/>` component.

### Turn and Talk 

If you were curious enough to poke around the code base, you may have noticed a bit of code that looks like this:

```js
<button onClick={() => this.props.history.push(`/posts/${this.props.id}`)}>
```

Let's google `history.push` in React and discuss with your findings with your neighbor.


## Recap

## Resources
- [React Router Quick Start](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Router Basic Components](https://reacttraining.com/react-router/web/guides/basic-components)
- [React Router Basic Example](https://reacttraining.com/react-router/web/example/basic)
- [React Router URL Parameters](https://reacttraining.com/react-router/web/example/url-params)
