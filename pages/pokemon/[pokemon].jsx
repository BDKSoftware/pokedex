import React, { useState } from "react";
import classes from "../../styles/PokemonScreen.module.css";
import { setPokemonColorbyType } from "../../utils/setPokemonColorbyType";

const PokemonScreen = ({ pokemon }) => {
  let mainType = pokemon.types[0].type.name;
  let pokemonTypeColor = setPokemonColorbyType(mainType);
  let types = pokemon.types
    .map(
      (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
    )
    .join(", ");
  let pokemonName = pokemon.name;

  console.log(pokemon.types[0].type.name);
  return (
    <div className={classes.pokemonScreenContainer}>
      <div
        className={classes.pokemonContainer}
        style={{
          backgroundColor: pokemonTypeColor + "B3",
          borderColor: "white",
        }}
      ></div>
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
