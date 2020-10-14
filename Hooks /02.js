// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from "react";

function useLocalStorageState(key, defaultValue = "") {
  // This is lazy initialization. Basically we pass a function to tell React
  //  that we only want this run after the first render since getting an item
  //  from local storage can be slow.
  const [value, setValue] = React.useState(() => {
    return window.localStorage.getItem(key) || defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}

function Greeting() {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  const [name, setName] = useLocalStorageState("name");

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
