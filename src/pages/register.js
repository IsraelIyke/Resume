import { useState } from "react";
import { supabase } from "../client";
import Nav from "./component/nav";
import { Grid, Box } from "@mui/material";
import Textfield from "./Textfield/textfield";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      } else {
        handleClick();
      }
    } catch (error) {
      alert("This is an error message!");
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        X
      </IconButton>
    </React.Fragment>
  );
  return (
    <Box sx={{ flexGrow: 1 }} className="container">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <form className="form-container">
          <Grid item>
            <h2>Sign Up</h2>
            <br />
          </Grid>
          <Grid item>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Success! Verify email if this is your first sign up"
              action={action}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Textfield
              type="email"
              placeholder="Email"
              id="email"
              label="Email"
              setState={setEmail}
              value={email}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Textfield
              type="password"
              placeholder="Password"
              id="password"
              label="Password"
              setState={setPassword}
              value={password}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <button
              className="signup-button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
            >
              {(loading && "loading") || "Register"}
            </button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
}
