// Basic React Imports
import React, { useEffect, useState } from "react";

// Import Link from NextJS
import Link from "next/link";

// Import Styling for component
import classes from "../styles/Home.module.css";

// Import Pokemon Type Color from PokemonTypeColor.js
import { setPokemonColorbyType } from "../utils/setPokemonColorbyType";

// Functional Definition for Search Item Component
const SearchItem = ({ pokemon }) => {
  // State Values saved for the Pokemon
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonId, setPokemonId] = useState("");
  const [pokemonColor, setPokemonColor] = useState("");

  // Function that takes in pokemon's name (String) as a parameter
  // It takes the name and appends it to the API URL String
  // Returns a pokemon's data in JSON format
  async function getPokemonData(pokemon_name) {
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    const res = await fetch(BASE_URL + pokemon_name);
    const pokemon = await res.json();
    return pokemon;
  }

  // Function calls when component parameter Pokemon is initialized or changed
  // It runs getPokemonData to retrieve pokemon data from API
  // Then sets state values with the API results (Maybe Change results to be more descriptive?)
  // If it fails, it console logs the error returned from the API
  useEffect(() => {
    getPokemonData(pokemon.name)
      .then((result) => {
        setPokemonName(result.name);
        setPokemonImage(result.sprites.front_default);
        setPokemonType(
          result.types
            .map(
              (type) =>
                type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
            )
            .join(", ")
        );
        setPokemonId(result.id);
        setPokemonColor(setPokemonColorbyType(result.types[0].type.name));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [pokemon]);

  // Return for Rendering
  return (
    <>
      {/* if the pokemon image is null, it returns a blank React Fragment
      Only images that are not supported are due to recent release (Hisuian Forms/ Gen 9)
      Therefore will not return that pokemon until API is updated */}
      {pokemonImage != null ? (
        <Link href={`/pokemon/${pokemonName}`}>
          <div
            className={classes.searchItem}
            style={{
              backgroundColor: pokemonColor.toString() + "B3",
              borderColor: pokemonColor.toString(),
            }}
          >
            <div className={classes.nameContainer}>
              <span className={classes.searchText}>{`#` + pokemonId}</span>
              <span className={classes.searchText}>
                {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
              </span>
            </div>
            <div className={classes.imageContainer}>
              <img src={pokemonImage} alt={pokemonName} />
            </div>
            <div className={classes.typeContainer}>
              <span className={classes.searchText}>{pokemonType}</span>
            </div>
          </div>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

// Export of Search Item for use.
export default SearchItem;
