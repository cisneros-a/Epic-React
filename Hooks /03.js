// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  //adding the function to our useState it will call the function when the
  //  component is rendered only for the first time or it needs to be. This is
  //  called a lazy intitialization.
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Name() {
  const [name, setName] = useLocalStorageState('name')

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  // 💣 delete this, it's now managed by the App
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

// 🐨 uncomment this
function Display({animal}) {
  return <div>{`Hey, your favorite animal is: ${animal}!`}</div>
}

// 💣 remove this component in favor of the new one

function App() {
  // 🐨 add a useState for the animal
  const [animal, setAnimal] = useLocalStorageState('animal')
  return (
    <form>
      <Name />
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      {/* 🐨 pass the animal prop here */}
      <Display animal={animal} />
    </form>
  )
}

export default App
