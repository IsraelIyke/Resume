import { useState } from "react";
import { supabase } from "../client";
import Nav from "./component/nav";
import { Grid, Box } from "@mui/material";
import Textfield from "./Textfield/textfield";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
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
  const handleChangePassword = async (email) => {
    try {
      setLoading(true);

      let { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );

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
            <h2>Password Recovery</h2>
            <br />
          </Grid>
          <Grid item>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Success! Please check your email"
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
            <button
              style={{ width: "20rem" }}
              className="signup-button"
              onClick={(e) => {
                e.preventDefault();
                handleChangePassword(email);
              }}
            >
              {(loading && "loading") || "Send Password Recovery Email"}
            </button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
}
