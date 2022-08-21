import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "../styles/Home.module.css";

const SearchItem = ({ pokemon }) => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonId, setPokemonId] = useState("");
  const [pokemonColor, setPokemonColor] = useState("");

  async function getPokemonData(pokemon_name) {
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    const res = await fetch(BASE_URL + pokemon_name);
    const pokemon = await res.json();
    return pokemon;
  }

  function chooseColor(pokemonType) {
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
        setPokemonColor(chooseColor(result.types[0].type.name));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [pokemon]);

  return (
    <>
      {pokemonImage != null ? (
        <Link href={`/pokemon/${pokemonName}`}>
          <div
            className={classes.searchItem}
            style={{
              backgroundColor: pokemonColor.toString() + "B3",
              opacity: "0.8",
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

export default SearchItem;
