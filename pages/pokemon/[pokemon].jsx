import React from "react";

const PokemonScreen = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div>
      <h1>{pokemon.name}</h1>
    </div>
  );
};

export default PokemonScreen;

export async function getStaticProps({ params }) {
  const API_URL = "https://pokeapi.co/api/v2/";
  const res = await fetch(API_URL + `pokemon/${params.pokemon}`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon: pokemon,
    },
  };
}

export async function getStaticPaths() {
  const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1155&offset=0";
  const res = await fetch(API_URL);
  const pokemonList = await res.json();

  return {
    paths: pokemonList.results.map((pokemon) => ({
      params: { pokemon: pokemon.name.toString() },
    })),
    fallback: false,
  };
}
