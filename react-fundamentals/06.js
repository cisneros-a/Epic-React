// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import React from "react";

function UsernameForm({ onSubmitUsername }) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0]
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input by specifying an `id` on
  // the input and a matching value as an `htmlFor` prop on the label.

  const inputRef = React.useRef(null);
  const [username, setUsername] = React.useState("");
  // const [error, setError] = React.useState(null)

  // const handleChange = e => {
  //   let value = e.target.value
  //   const isValid = value === value.toLowerCase()
  //   setError(isValid ? null : 'Username must be lowercase')
  // }

  const handleSumbit = (e) => {
    console.log(inputRef.current);
    e.preventDefault();
    onSubmitUsername(inputRef.current.value);
  };

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSumbit}>
      {/* <h4>{error}</h4> */}
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          value={username}
          ref={inputRef}
          id="usernameInput"
          type="text"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username) => alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export default App;
