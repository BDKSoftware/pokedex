import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import classes from "../../styles/PokemonScreen.module.css";
import { setPokemonColorbyType } from "../../utils/setPokemonColorbyType";

const PokemonScreen = ({ pokemon }) => {
  let mainType = pokemon.types[0].type.name;
  let pokemonTypeColor = setPokemonColorbyType(mainType).toString() + "B3";
  let types = pokemon.types
    .map(
      (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
    )
    .join(", ");
  let pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  let height = pokemon.height;
  let weight = pokemon.weight;
  let id = pokemon.id;
  let imgURL = pokemon.sprites.front_default;
  let stats = pokemon.stats;

  return (
    <div className={classes.pokemonScreenContainer}>
      <div
        className={classes.pokemonContainer}
        style={{
          backgroundColor: pokemonTypeColor,
          borderColor: "white",
        }}
      >
        <div className={classes.top}>
          <div className={classes.topLeft}>
            <div className={classes.pokemonDetailCard}>
              <img src={imgURL} alt={pokemonName} className={classes.sprite} />
            </div>
          </div>
          <div className={classes.topRight}>
            <div className={classes.pokemonDetailCard}>
              <h1 className={classes.titleText}>
                {pokemonName} #{id}
              </h1>
              <h2 className={classes.titleText}>Height: {height}</h2>
              <h2 className={classes.titleText}>Weight: {weight}</h2>
              <h2 className={classes.titleText}>Types: {types}</h2>
            </div>
          </div>
        </div>
        <div className={classes.bottom}></div>
      </div>
      <Link href="/">
        <span className={classes.searchText}>Back To Search</span>
      </Link>
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
