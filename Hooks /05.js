// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import React from "react";
import reactDomTestUtilsProductionMin from "react-dom/cjs/react-dom-test-utils.production.min";
// eslint-disable-next-line no-unused-vars
import VanillaTilt from "vanilla-tilt";

//This exercise was to demonstrate that we don't actually have access to the dom nodes in our
//  render method. JSX is just syntactic sugar for "React.createElement()". And in order to get
//  access to the DOM nodes are created, we use the useRef() hook. Then we can access the nodes
//  component has been put on the DOM (mounted) with a useEffect hook by referencing the useRef,
//  which we have done here.
//We also make sure to take advantage of the cleanup in useEffect to remove the eventhandler (vanillaTilt)
//  on the tiltNode before it is unmounted so we don't have uneeded event handlers in the DOM.

function Tilt({ children }) {
  // 🐨 create a ref here with React.useRef()

  const tiltRef = React.useRef();

  React.useEffect(() => {
    const tiltNode = tiltRef.current;
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
    return () => {
      tiltNode.vanillaTilt.destroy();
    };
  }, []);

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  // 💰 like this:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })
  //
  // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
  // object to your DOM node to cleanup:
  // `return () => tiltNode.vanillaTilt.destroy()`
  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  );
}

export default App;
