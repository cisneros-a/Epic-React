// Lifting state
// http://localhost:3000/isolated/exercise/03.js

//Here we worked on Lifting State. Intitially, we have animal and name state stored in seperate components.
//  However, if we wanted our display to include both name and animal, we would have to lift the state of
//  animal. So we moved [animal, setAnimal] to App (the closest shared parent) and passed down the state and
//  change function in props.

//We then decided our display no longer needed the animal, so we reverted back to colocating the state of
//  animal, which allows for a more maintainable application.

import React from "react";

function Name({ name, onNameChange }) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  );
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState("");

  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={(event) => setAnimal(event.target.value)}
      />
    </div>
  );
}

// 🐨 uncomment this
function Display({ name }) {
  return <div>{`Hey ${name}, you are great!`}</div>;
}

function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState("");
  return (
    <form>
      <Name name={name} onNameChange={(event) => setName(event.target.value)} />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal />
      {/* 🐨 pass the animal prop here */}
      <Display name={name} />
    </form>
  );
}

export default App;
