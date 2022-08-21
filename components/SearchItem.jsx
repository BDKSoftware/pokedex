// Basic React Imports
import React, { useEffect, useState } from "react";

// Import Link from NextJS
import Link from "next/link";

// Import Styling for component
import classes from "../styles/Home.module.css";

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

  // Function that takes in a Pokemon's type(String) as a parameter
  // Returns a hexidecimal color as a string
  // Defaults to white but should never default
  function setPokemonColorbyType(pokemonType) {
    switch (pokemonType) {
      case "bug":
        return "#3b9950";
      case "dark":
        return "#5a5979";
      case "dragon":
        return "#448b93";
      case "electric":
        return "#e3e32b";
      case "fairy":
        return "#ea1369";
      case "fighting":
        return "#ef6138";
      case "fire":
        return "#ef6138";
      case "flying":
        return "#93b2c7";
      case "ghost":
        return "#93b2c7";
      case "grass":
        return "#27cb4f";
      case "ground":
        return "#a9702c";
      case "ice":
        return "#86d2f5";
      case "normal":
        return "#ca98a7";
      case "poison":
        return "#ca98a7";
      case "psychic":
        return "#a42a6c";
      case "rock":
        return "#8b3e21";
      case "steel":
        return "#5e756d";
      case "water":
        return "#1552e2";
      default:
        return "#fff";
    }
  }

  // Function calls when component parameter Pokemon is initialized or changed
  // It runs getPokemonData to retrieve pokemon data from API
  // Then sets state values with the API results (Maybe Change results to be more descriptive?)
  // If it fails, it console logs the error returned from the API
  useEffect(() => {
    getPokemonData(pokemon.name)
      .then((result) => {
        console.log(result.types[0].type.name);
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
      {/* if the pokemon image is null, it returns a blank React Fragment */}
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
