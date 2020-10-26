// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React from "react";

//This is the most common way to use useReducer mostly due to Redux, which is to use a
// type in our object and use a switch statement to determine how to update state.
function countReducer(state, action) {
  const { step, type } = action;
  switch (type) {
    case "INCREMENT":
      return { count: state.count + step };
    default:
      throw new Error(`Unsuported action type ${type}`);
  }
}

function Counter({ initialCount = 0, step = 2 }) {
  //the name 'dispatch' can be whatever we want, we noticed in last extra credit that
  //  it was called setState still. We are basically just changing the name of the function
  //  to use our countReducer.
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;

  //we are calling our dispatch function now and sending over the action, which has a type
  //  that will be handled by our switch statement in our reducer.
  const increment = () => dispatch({ type: "INCREMENT", step });

  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
