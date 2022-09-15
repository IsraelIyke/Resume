import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
// import { Grid, Box } from "@mui/material";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Password({ session, handleDashboard }) {
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };
  const handle = () => {
    setError(true);
  };
  const handles = () => {
    setErrors(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setError(false);
    setErrors(false);
  };

  async function updateProfile({ password }) {
    //
    try {
      let { error } = await supabase.auth.update({
        email: session.user.email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // alert("updated");
      handleClick();
    } catch (error) {
      handles();
      // alert(error.message);
      setErrorMessage(error.message);
      handle();
    }
  }
  return (
    <div>
      <div className="input-container">
        <h2>Change Password</h2>
      </div>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success!
          </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage === "Request Failed"
              ? "Please check internet connection"
              : errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={errors} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage === "Request Failed"
              ? "Please check internet connection"
              : errorMessage}
          </Alert>
        </Snackbar>
      </div>
      <div className="acc-container">
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="Change Password"
            id="password"
            label="Change Password"
            setState={setPassword}
            value={password}
          />
        </div>
      </div>

      <div className="input-container">
        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              password,
            })
          }
        >
          update
        </button>
        <button className="signup-button" onClick={handleDashboard}>
          Back
        </button>
      </div>
    </div>
  );
}
