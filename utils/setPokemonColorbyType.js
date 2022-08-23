// Function that takes in a Pokemon's type(String) as a parameter
// Returns a hexidecimal color as a string
// Defaults to white but should never default

export function setPokemonColorbyType(pokemonType) {
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
