// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from "react";

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

//Here we worked on making HTTP requests in a useEffect hook that is trigerred every time
//  pokemonName has changed. Then depending on the info we recieved, we rendered something different.
//Then we implemented a catch at the end of our request just in case our request failed and we stored
//  the error to state to return something specifically for an error.

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) return;

    setError(null);
    //this is setting the 'loading state'
    setPokemon(null);

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setPokemon(pokemonData);
      })
      .catch((error) => {
        setError(error);
      });
  }, [pokemonName]);

  if (error) {
    return (
      <div role="alert">
        There was an error:{" "}
        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </div>
    );
  } else if (!pokemonName) {
    return "Submit a pokemon";
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  } else {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
