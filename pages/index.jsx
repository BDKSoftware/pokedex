// Import Head to control page meta data
import Head from "next/head";

// useState import from react
import { useState } from "react";

// CSS Import
import classes from "../styles/Home.module.css";

// Import of SearchItem Component to be rendered within SearchResults
import SearchItem from "../components/SearchItem";

// Functional Definition for Home Page
export default function Home({ data }) {
  // Breaks down data returned from getStaticProps to more usable data
  const pokemonList = data.results;

  // State value for input field (SearchBar)
  const [query, setQuery] = useState("");

  // Functional definition of handleQuery
  // Takes in an event as a parameter
  // Function prevents page from rerender
  // Sets value of query state
  function handleQuery(event) {
    event.preventDefault();
    setQuery(event.target.value);
  }

  // Return for Rendering
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
          {/* Filters pokemonList data by the user input
          Formats the pokemon's name
          maps pokemon data to searchItem component */}
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

// Gets server data and passes it to the component before rendering
// Data will always be a pokemon
export async function getStaticProps() {
  const API_URL = "https://pokeapi.co/api/v2/";
  const res = await fetch(API_URL + "pokemon?limit=1155&offset=0");
  const pokemon = await res.json();

  // Guard Clause incase data is not retrieved
  if (pokemon == null || pokemon == undefined) return;

  // Passes data to our component
  return {
    props: {
      data: pokemon,
    },
  };
}
