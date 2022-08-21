import Head from "next/head";
import { useEffect, useState } from "react";
import classes from "../styles/Home.module.css";
import Link from "next/link";
import SearchItem from "../components/SearchItem";

export default function Home({ data }) {
  const pokemonList = data.results;

  const [query, setQuery] = useState("");

  function handleQuery(event) {
    event.preventDefault();
    setQuery(event.target.value);
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>PokeDex</title>
        <meta name="description" content="PokeDex powered by PokeAPI" />
      </Head>
      <div className={classes.main}>
        <div className={classes.searchArea}>
          <input
            type="text"
            placeholder="Enter A Pokemon's Name"
            className={classes.query}
            value={query}
            onChange={handleQuery}
          />
        </div>
        <div className={classes.searchResults}>
          {pokemonList
            .filter((pokemon) => {
              if (query === "") {
                return;
              } else if (
                pokemon.name.toLowerCase().startsWith(query.toLowerCase())
              ) {
                return pokemon;
              }
            })
            .map((pokemon, index) => {
              return <SearchItem pokemon={pokemon} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const API_URL = "https://pokeapi.co/api/v2/";
  const res = await fetch(API_URL + "pokemon?limit=1155&offset=0");
  const pokemon = await res.json();

  return {
    props: {
      data: pokemon,
    },
  };
}
