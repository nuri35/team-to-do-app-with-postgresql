import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { CssBaseline, Container, Grid } from "@material-ui/core";

import { AuthContext } from "./components/Context";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Team from "./components/pages/Team";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyle();
  const { ısAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <>
        <CssBaseline />
        <div className="main">
          <Container maxWidth="lg">
            <Grid container className={classes.container}>
              <Grid item xs={12}>
                <Router>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        ısAuthenticated ? <Home /> : <Navigate to="/login" />
                      }
                    />

                    <Route
                      path="/:id"
                      element={
                        ısAuthenticated ? <Team /> : <Navigate to="/login" />
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        ısAuthenticated ? <Navigate to="/" /> : <Login />
                      }
                    />

                    <Route
                      path="/register"
                      element={
                        ısAuthenticated ? <Navigate to="/" /> : <Register />
                      }
                    />
                  </Routes>
                </Router>
              </Grid>
            </Grid>
          </Container>
        </div>
      </>
    </div>
  );
}

export default App;
