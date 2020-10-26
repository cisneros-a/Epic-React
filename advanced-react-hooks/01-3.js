// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React from "react";

//We can pass in anything we want as an action, and here we are able to pass
//  in either an object or function and our reducer is able to determine what to do
//  based off what has been passed in.
function countReducer(state, action) {
  if (typeof action === "object") {
    return { ...state, ...action };
  }
  if (typeof action === "function") {
    return action(state);
  }
}

function Counter({ initialCount = 0, step = 2 }) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  //This is when we pass in an object as an action
  // const increment = () => setState({count: count + step})

  //Here we are passing in a function as an action.
  const increment = () =>
    setState((currentState) => ({ count: currentState.count + step }));

  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
