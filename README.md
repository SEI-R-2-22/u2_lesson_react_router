# React Router

![](https://i.ytimg.com/vi/4ii2L3D20S4/maxresdefault.jpg)

## Overview

Up to this point, our React applications have been limited in size, allowing us to use basic control flow in our component's returns to determine what gets rendered to our users. However, as our React applications grow in size and scope, we need an easier and more robust way of rendering different components. Additionally, we will want the ability to set information in the URL parameters to make it easier for users to identify where they are in the application.

In this lesson, we'll be building the routing components and paths for a luxury boating site.

## Lesson Objectives

- Learn about routing with React
- Use React Router to create routes and links to different pages

## Getting Started

You've been provided with starter code and components.

- `Fork` and `clone` this repository.
- `cd` into the repo
- Run `npm install` to install our necessary packages.

## What is React Router?

React Router makes it easy for us to route URLs, not to different pages, but by dynamically loading different components on the *same page* as the user navigates to different URLs. Once we define how the URLs are routed to the components, React Router will manage our Single Page Application (SPA) `browser history` automatically.

## React Router Setup

First, we need to install `react-router-dom` and save it as a dependency.  You will need to manually install this any time you want to use it.

```sh
npm install react-router-dom
```

To configure our current application to use React Router, we'll need to import the `BrowserRouter` component into `index.js` and use it as a wrapper for our `App` component. `BrowserRouter` will, in turn, render `App` through which all the rest of our components will be rendered and give us access to router components:

```js
// index.js

import { BrowserRouter } from 'react-router-dom'

// ...

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
```

By making `BrowserRouter` the root component of our app, all child components, including `App` will have access to a `history` object through which information like the current location and URL can be accessed or changed. Additionally, in order to use the other routing components provided by React Router, a `BrowserRouter` provider component is necessary.

![](https://ncoughlin.com/static/f0a60a719be3f7c71e060208204d7319/74549/1.png)

---

## Making Our First Route

Next, in `App.js`, we need to import all of the components we want to use for pages in our app. All necessary components have been provided for you already. We'll focus on setting up proper _routing_ between them. To start, let's import the `Home` component into `App.js` along with the `<Routes>` and `<Route/>` components.

```js
// App.js

import React, { useState } from 'react'
import boatsArray from './data/boats'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
```

Now, we'll start by creating a `<Routes></Routes>` component within the `<main>`.  We will then nest a `<Route/>` component between then opening and closing tags of `Routes` and provide the element attribute a value of `<Home/>`.

```jsx
// App.js

//...

  return (
    <div className="App">
      <header>
        {/* Import Nav here */}
      </header>
      <main>
        <Routes>
          <Route path="/" element={ <Home /> } />
        </Routes>
      </main>
    </div>
  )

//...
```

- Think of `App.js` as an entry point for our application that will control the flow of URL routes and links as we add them.

- As your location changes in your address bar `<Routes>` will look through all of the children elements (`<Route>`) to find the best match.

- A **`<Route/>`** component connects a certain `path` in the URL with the relevant component to `render` at that location.

- The `path` for a `<Route/>` refers to the URL that the route is associated with. Note: the `'/'` path is referred to as the root path of our application, as it is the first path we have access to when our site loads, so it makes sense to render the `Home` component at this route.

- Components are provided to a `<Route/>` component through an `element` prop, which tells the route which component to render.
---

## Adding Links

Now let's add in a way of getting back to the `Home` page. Import the `Nav` component from the `components` folder into `App.js` and render it inside the `<header>` tag.

Now, we'll import the `<Link/>` component from `react-router-dom` in our `Nav` component to set up a link back to the `Home` page:

```js
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {

  return (
    <nav className="navbar">
      <h4>Starboard</h4>
      <div>
        <Link to="/">Home</Link>
      </div>
    </nav>
  )
}

export default Nav
```

The `<Link/>` component provided by React Router allows us to create links, like standard HTML `<a>` tags that navigate to a location in our application's routes.

- The `<Link/>` and `<NavLink/>` components provided by React Router require a `to` prop, similar to an `href` in an `<a>` tag, that tell React Router where to navigate.
- The `to` prop needs to match one of the `path` props of a `<Route/>` to navigate between locations in our application.

---

## Passing Props Into Route Components

Let's add in another route to `App.js`...

- Import the `Listings` component and add this route to `App.js` just below our other `<Route/>`.

```jsx
<Route path="listings" element={ <Listings /> }/>
```

You might notice that the `Listings` component is making use of a prop called `boats`, however we aren't currently passing any props to it. Let's fix that.

```jsx
<Route path="listings" element={ <Listings boats={boats} />} />
```

- Here we've passed in the custom prop of `boats`, which gives our `Listings` component access to the array of boats in state.

Now that we've added in the route, our boats should be rendering in our `Listings` component at the `'/listings'` location.

- Let's add in a quick `<Link/>` to `Nav.js` to allow quick access to our listings.
- It should have a `to` prop of `'listings'` to connect to the route we've just set up.

```jsx
<Link to="listings">Listings</Link>
```

---

## Using Params and Router Props

Now that we have a route to view a list of all of our boats, how would we go about creating a Route for a specific boat to view its details? This would be a great case for creating a _dynamic route_, utilizing params!

- In `App.js`, import the `BoatDetails` component.
- Now we'll set up a `<Route/>` for it that uses params, or variable URL patterns, to create navigation for every unique boat.

```js
<Route path="/listings/:id" element={ <BoatDetails boats={boats} />} />
```

Note the `/:id` following the `/listings` portion of the `path`. What we've done here by using the colon `:` followed by `id` is establish a variable `id` _within our URL pattern_ for this route, or in other words, an id param.

- Params are used to create dynamic routes that change depending on the live data passed into the param. In this case, our param is denoted by `'/:id'`.

Ok, but how do we navigate to this route?

Let's do that from our `Listings.js` component, since it has access to data about our boats.

You might have noticed that `Listings.js` has a method called `showBoat()` that is currently doing nothing. We'll alter it now to create dynamic navigation to our `'/listings'` route.

- Since each `boat` is being passed as an argument into the method, we'll make use of a specific attribute to create a dynamic route.

- First, we will import the `useNavigate` hook from React Router

```jsx
// Listings.jsx
import { useNavigate } from 'react-router-dom'
```
- Per React Router documentation:  The `useNavigate` hook returns a function that lets you navigate programmatically.

- Add the following to the `showBoat()` method in `Listings.js`:

```js
// Listings.jsx

//...
let navigate = useNavigate()

const showBoat = (boat) => {
  navigate(`${boat.id}`)
}

//...
```

Here we're passing the `id` attribute of the boat object as an argument of the function returned from `useNavigate()`. This way, we will have a unique route path for every boat in our list. For example, if we had a boat with an id of 1, we would be navigated to `'/listings/1'` when this method is fired for that boat.

Great, we've set up a way of navigating to a unique boat, but we aren't getting the data to display just yet.

Let's move over to `BoatDetails.js` to fix that. It currently has a `useEffect` hook that isn't doing anything and a state property for a `boat`. Add the following to the `useEffect`.

```js
// BoatDetails.jsx
import { useParams } from 'react-router-dom'
//...

let { id } = useParams() // we are using destructuring syntax here to grab the from the key/value pair of 'id' from the params object.

useEffect(() => {
  let selectedBoat = props.boats.find(
    (boat) => boat.id === parseInt(id)
  )
  setBoat(selectedBoat)
}, [props.boats, id])

//...
```

- Here, we're using React Router's `useParams` hook to grab the value at the `id` param from our URL location.
- With access to the id from the params, we can use it to find a specific boat by its id from the `boats` array that was passed as props into our `BoatDetails` component.
- Finally, we'll set the state of `boat` to the boat we've found to display it when the component is mounted.

Try clicking on a boat from the `Listings` page and see what happens. We should now be able to see a new component that displays the details for a single boat.

---

## Route Rendering Methods

In `App.js` we'll import our last component, `BoatForm.js`, which will allow us to create new boats and add them to our listings.

We will need a `<Route/>` for this component:

```jsx
<Route path="new" element={ <BoatForm newBoat={newBoat} handleChange={handleChange} addBoat={addBoat} />} />
```

Our `BoatForm` has access to two methods from `App.js`: the `handleChange()` method - which will update the state of `newBoat` from its form inputs, and `addBoat()` - which will add a new boat into our `boats` state.

Let's add in a `<Link/>` in `Nav` that connects to our "new" route.

```jsx
// Nav.jsx

//...

<div>
  <Link to="/">Home</Link>
  <Link to="listings">Listings</Link>
  <Link to="new">Add Boat</Link>
</div>

//...
```

Now that we can view this route, let's try adding in a new boat!

This generally works but we want to be able to navigate back to the list of boats once we have added a new boat.

```js
// BoatForm.jsx
import { useNavigate } from 'react-router-dom'
//...
let navigate = useNavigate()

const handleSubmit = (e) => {
  props.addBoat(e)
  navigate('/listings')
}

//...
```

And with that, we've set up our `BoatForm`! Congrats!

---

## You Do

For this section we'll need to make use of 2 `<Link/>` components.

- In `Listings.js`, import a `<Link/>` component from React Router and use it to create a back button that takes us back to the `Home` page at the `'/'` route.
- In `BoatDetails.js` import another `<Link/>` component to create a back button that takes us back to the `'/listings'` route.

---

## Recap

With React Router, we're able to create navigation in our applications with special components and properties. Key concepts covered here include:

- `<Routes/>` - An element wrapped around `<Route/>` components to help React Route select the most accurate component for an associated route.
- `<Route/>` - Used to render specific components at different URL locations
- `<Link/>` - Used to link to different routes, usually from within a component rendered by a route
- `element` - Used to render a component for a route
- `useParams` - a hook provided by React Router to help with navigation associated with dynamic route parameters
- `useNavigate` - a hook provided by React Router to add routes to a browsers navigation history

## Resources

- [React Router Getting Started](https://reactrouter.com/docs/en/v6/getting-started/installation)
- [React Router Main Components](https://reactrouter.com/docs/en/v6/getting-started/concepts)
- [React Router Basic Example](https://reactrouter.com/docs/en/v6/examples/basic)
- [React Router Tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
