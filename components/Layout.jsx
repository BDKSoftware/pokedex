// General React Imports
import React from "react";

// Css Import
import classes from "../styles/Layout.module.css";

//NextJS imports
import Link from "next/link";

// Component Definition
// Passes all other components for this project to set global layout and css
const Layout = (props) => {
  return (
    <div className={classes.layoutContainer}>
      <header className={classes.header}>
        <div className={classes.headerLeft}>
          <span className={classes.headerTitle}>
            <Link href="/">PokeDex</Link>
          </span>
        </div>
        <div className={classes.headerRight}>
          <span className={classes.headerHidden}>
            <Link href="/">Home</Link>
          </span>
          <span>
            <Link href="/items">Items</Link>
          </span>
          <span>
            <Link href="moves">Moves</Link>
          </span>
          <span>
            <Link href="abilities">Abilities</Link>
          </span>
        </div>
      </header>
      <main className={classes.main}>{props.children}</main>
      <footer className={classes.footer}>
        <Link href="https://pokeapi.co/">Powered By PokeAPI</Link>
      </footer>
    </div>
  );
};

// File export for Layout
export default Layout;
