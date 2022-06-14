import React, { useState } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function AddPokemon() {
  // Navigation variable to navigate to next route
  let navigate = useNavigate();

  // States
  const [pokemonValue, setPokemonValue] = useState("");

  const handlePokemonName = (event) => {
    setPokemonValue(event.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/pokemon/${pokemonValue}`);
  };

  return (
    <>
      <Container maxWidth="xs" component="main" style={{ marginTop: "50px" }}>
        <Grid container spacing="2">
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter Pokemon Name"
              value={pokemonValue}
              onChange={handlePokemonName}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              disabled={pokemonValue !== "" ? false : true}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
