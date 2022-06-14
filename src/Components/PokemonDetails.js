import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PokemonDetails() {
  //states
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(false);
  const [showResponseInJson, setShowResponseInJson] = useState(false);
  const [loading, setLoading] = useState(true);

  //extract params from url using useParams hook
  const { name } = useParams();
  let navigate = useNavigate();

  //API call for fetching pokemon details

  useEffect(() => {
    getPokemonDetails(name)
      .then((_data) => {
        if (Object.keys(_data.data).length !== 0) {
          setPokemonData(_data.data);
          setError(false);
          setLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [name]);

  const getPokemonDetails = (name) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleResponseShowClick = () => {
    setShowResponseInJson(true);
  };

  return (
    <>
      <Container component="main" maxWidth="lg" style={{ marginTop: "50px" }}>
        <Grid container spacing={2}>
          {!showResponseInJson ? (
            <>
              <Grid item xs={12}>
                {!error && pokemonData !== null ? (
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Pokemon ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Image</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{pokemonData.id}</TableCell>
                          <TableCell>{pokemonData.name}</TableCell>
                          <TableCell>{pokemonData.weight}</TableCell>
                          <TableCell>
                            <img
                              style={{ width: "100px", height: "100px" }}
                              src={pokemonData?.sprites?.front_default}
                              alt="Pokemon Image"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <>
                    <Typography variant="h3" style={{ textAlign: "center" }}>
                      No Pokemon Found
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleBackClick}
                >
                  Go Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={pokemonData !== null ? false : true}
                  onClick={handleResponseShowClick}
                >
                  Show Response (in JSON)
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setShowResponseInJson(false)}
                >
                  Show Table
                </Button>
              </Grid>
              <Grid item xs={12}>
                <span>{JSON.stringify(pokemonData)}</span>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}
