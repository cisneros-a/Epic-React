// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from "react";

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // const [status, setStatus] = React.useState('idle')
  const [state, setState] = React.useState({
    status: "idle",
    pokemon: null,
    error: null,
  });
  const { status, pokemon, error } = state;

  React.useEffect(() => {
    if (!pokemonName) return;
    setState({ ...state, status: "pending" });

    fetchPokemon(pokemonName)
      .then((pokemon) => {
        //This order causes an error. setStatus is causing a re-render that happens
        //  before setPokemon happens. So we are resolved, but PokemonDataView is getting null.
        //React can normally batch the state updates, but cannot do so in async functions like this.
        //  setStatus('resolved')
        //  setPokemon(pokemonData)
        setState({ ...state, status: "resolved", pokemon });
      })
      .catch((error) => {
        // setError(error)
        // setStatus('rejected')
        setState({ ...state, status: "rejected", error });
      });
  }, [pokemonName]);

  switch (status) {
    case "idle":
      return "Submit a pokemon";
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "resolved":
      return <PokemonDataView pokemon={pokemon} />;
    case "rejected":
      return (
        //the role tag allows screen readers to read the role and not just 'div'
        <div role="alert">
          There was an error:{" "}
          <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        </div>
      );
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
