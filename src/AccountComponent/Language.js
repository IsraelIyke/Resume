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

export default function Language({ session, handleTemplateOne }) {
  const [loading, setLoading] = useState(true);
  const [language1, setLanguage1] = useState(null);
  const [language2, setLanguage2] = useState(null);
  const [language3, setLanguage3] = useState(null);

  const [counting, setCounting] = useState(0);
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

  function handleCountAdd() {
    setCounting((prev) => prev + 1);
  }
  function handleCountMinus() {
    setCounting((prev) => prev - 1);
    if (counting === 2) setLanguage3(null);
    if (counting === 1) setLanguage2(null);
  }
  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`language1, language2, language3, counting`) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setLanguage1(data.language1); //
        setLanguage2(data.language2);
        setLanguage3(data.language3);
        setCounting(data.counting);
      }
    } catch (error) {
      // alert(error.message);
      handles();
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ language1, language2, language3, counting }) {
    //
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id, //
        language1,
        language2,
        language3,
        counting,
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
    handleTemplateOne();
  }
  return (
    <div>
      <div className="input-container">
        <h2>Language</h2>
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
        {counting < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Language One"
              id="language1"
              label="Language One"
              setState={setLanguage1}
              value={language1}
            />
          </div>
        )}
        {counting > 0 && counting < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Language Two"
              id="language2"
              label="Language Two"
              setState={setLanguage2}
              value={language2}
            />
          </div>
        )}
      </div>
      <div className="acc-container">
        {counting > 1 && counting < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Language Three"
              id="language3"
              label="Language Three"
              setState={setLanguage3}
              value={language3}
            />
          </div>
        )}
      </div>
      <div className="input-container">
        {counting < 2 && (
          <button onClick={handleCountAdd} className="signup-button">
            Add
          </button>
        )}
        {counting > 0 && counting < 3 && (
          <button onClick={handleCountMinus} className="signup-button">
            Remove
          </button>
        )}
      </div>
      <div className="input-container">
        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              language1,
              language2,
              language3,
              counting,
            })
          }
        >
          {(loading && "Loading") || "Template"}
        </button>
        {/* <button onClick={handleTemplateOne} className="signup-button">
          Template
        </button> */}
      </div>
    </div>
  );
}
