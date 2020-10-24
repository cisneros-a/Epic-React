// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React, { useReducer } from "react";

function countReducer(state, action) {
  //we are returning an object with the updated 'count' state. However, I don't get why
  //  we are spreading the old state value into the object as well.
  return { ...state, ...action };
}

function Counter({ initialCount = 0, step = 2 }) {
  // const [count, changeCount] = React.useReducer(countReducer, initialCount)

  const [state, setCount] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  // console.log(state)

  //whatever is passed in as a argument is the 'action' in our reducer.
  // const increment = () => changeCount({step})
  const increment = () => setCount({ count: count + step });
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
