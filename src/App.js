import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import AddPokemon from "./Components/AddPokemon";
import PokemonDetails from "./Components/PokemonDetails";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AddPokemon />} path="/" />
          <Route element={<PokemonDetails />} path="/pokemon/:name" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
