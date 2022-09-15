import { useState } from "react";
import { supabase } from "../client";
import Nav from "./component/nav";
import { Grid, Box } from "@mui/material";
import Textfield from "./Textfield/textfield";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handlePasswordEmail() {}
  const handleClick = () => {
    setOpen(true);
  };
  const handle = () => {
    setError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setError(false);
  };
  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) {
        throw error;
      } else {
        handleClick();
      }
    } catch (error) {
      // alert("This is an error message!");
      // alert(error.message);
      setErrorMessage(error.message);
      handle();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }} className="container">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <form className="form-container">
          <Grid item>
            <h2>Sign In</h2>
            <br />
          </Grid>
          <Grid item>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                This is a success message!
              </Alert>
            </Snackbar>
            <Snackbar
              open={error}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage === "Request Failed"
                  ? "Please check internet connection"
                  : errorMessage}
              </Alert>
            </Snackbar>
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
          <Grid item>
            <h5>
              Forgot your password?
              <Link to="/password-recovery">
                <span className="link-span"> click here</span>
              </Link>
            </h5>
          </Grid>
          <Grid item xs={12} md={12}>
            <button
              className="signup-button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
            >
              {(loading && "loading") || "Login"}
            </button>
          </Grid>
          <Grid item>
            <h5>
              Don't have an account?
              <Link to="/register">
                <span className="link-span"> sign up</span>
              </Link>
            </h5>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
}
