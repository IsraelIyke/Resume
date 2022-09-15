import { useEffect, useState } from "react";
import { supabase } from "../client";
// import { Grid, Box } from "@mui/material";
import Inputfield from "./Inputfield/inputfield";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BgInfo({ session, handleSkill }) {
  const [loading, setLoading] = useState(true);
  const [bgInfo, SetBgInfo] = useState(null);
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

  useEffect(() => {
    getProfile();
  }, [session]);

  const word = bgInfo + "";
  // const ar = Array.from(word);
  // const str = ar.length;
  // console.log(str);
  const myArray = word.split(" ");
  const wordCount = myArray.length;

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`bgInfo`) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        SetBgInfo(data.bgInfo); //
      }
    } catch (error) {
      // alert(error.message);
      handles();
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ bgInfo }) {
    //
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id, //
        bgInfo,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", //don't return the value after inserting
      });

      if (error) {
        throw error;
      }

      // alert("updated");
      handleClick();
    } catch (error) {
      // alert(error.message);
      setErrorMessage(error.message);
      handle();
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="input-container">
        <h2>Background Brief</h2>
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
      <div className="input-container">
        <h5>Word limit: 30</h5>
      </div>
      <div className="input-container">
        <h5>Word Used: {wordCount}</h5>
      </div>
      <div className="acc-container">
        <div className="input-container">
          <Inputfield
            type="text"
            placeholder="Background Brief"
            id="bgInfo"
            label="Background Brief"
            setState={SetBgInfo}
            value={bgInfo}
            classname="bg-info"
          />
        </div>
      </div>
      <div className="input-container">
        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              bgInfo,
            })
          }
        >
          {(loading && "Loading") || "update"}
        </button>
        <button onClick={handleSkill} className="signup-button">
          Next
        </button>
      </div>
    </div>
  );
}
