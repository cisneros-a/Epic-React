// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

//In this exercise we created an Error Boundary, which is a component that catches JS errors in their child component tree
//  and display a fallback UI instead of crashing.
//A class component becomes a ErrorBoundary when either getDerivedStateFromError or ComponentDidCatch is used.

function PokemonInfo({ pokemonName }) {
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
        setState({ ...state, status: "resolved", pokemon });
      })
      .catch((error) => {
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
      //this will now be handled by the errorBoundary.

      // return (
      //   <div role="alert">
      //     There was an error:{' '}
      //     <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      //   </div>
      // )
      throw error;
  }
}

//We created this component to pass as a prop to our error boundary.
//Within ErrorBoundary from the npm package, error is passed down.
//There is also a resetErrorBoundary function(the name is strict) which is a function we are passing down
//  in the onReset prop in our <ErrorBoundary>.
function errorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* When we were using the key prop, this was not only causing a re-mount of our error boundary,
              but also of the PokemonInfo component. Which causes a flash of the "Submit a pokemon" view.
            For now, we're adding a button in the fallback to reset pokemonName state*/}
        <ErrorBoundary onReset={handleReset} FallbackComponent={errorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
