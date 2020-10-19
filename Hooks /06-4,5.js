// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from "react";

import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

//In this exercise we created an Error Boundary, which is a component that catches JS errors in their child component tree
//  and display a fallback UI instead of crashing.
//A class component becomes a ErrorBoundary when either getDerivedStateFromError or ComponentDidCatch is used.

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <this.props.fallbackComponent error={this.state.error} />;
    }
    return this.props.children;
  }
}

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
function errorFallback({ error }) {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </div>
  );
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
        {/* We've added a key to our error boundary to reset the state of the error within the boundary.
            Otherwise, the error stays in state and we cannot recover from it. */}
        <ErrorBoundary key={pokemonName} fallbackComponent={errorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
