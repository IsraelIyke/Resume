import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
import Datefield from "./DatePicker/datefield";
import Inputfield from "./Inputfield/inputfield";
// import { Grid, Box } from "@mui/material";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Education({ session, handleLanguage }) {
  const [loading, setLoading] = useState(true);
  //   education one
  const [edu1, setEdu1] = useState(null);
  const [school1, setSchool1] = useState(null);
  const [dfrom1, setDFrom1] = useState(null);
  const [dto1, setDTo1] = useState(null);

  //   education two
  const [edu2, setEdu2] = useState(null);
  const [school2, setSchool2] = useState(null);
  const [dfrom2, setDFrom2] = useState(null);
  const [dto2, setDTo2] = useState(null);

  const [counter, setCounter] = useState(0);
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
    setCounter((prev) => prev + 1);
  }

  function handleCountMinus() {
    setCounter((prev) => prev - 1);
    if (counter === 1) {
      setEdu2(null);
      setDFrom2(null);
      setDTo2(null);
      setSchool2(null);
    }
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
        .select(
          `edu1,
          school1,
          dfrom1,
          dto1,
          edu2,
          school2,
          dfrom2,
          dto2,
          counter`
        ) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setEdu1(data.edu1);
        setSchool1(data.school1);
        setDFrom1(data.dfrom1);
        setDTo1(data.dto1);
        setEdu2(data.edu2);
        setSchool2(data.school2);
        setDFrom2(data.dfrom2);
        setDTo2(data.dto2);

        setCounter(data.counter);
      }
    } catch (error) {
      // alert(error.message);
      handles();
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    edu1,
    school1,
    dfrom1,
    dto1,
    edu2,
    school2,
    dfrom2,
    dto2,
    counter,
  }) {
    //
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id, //
        edu1,
        school1,
        dfrom1,
        dto1,
        edu2,
        school2,
        dfrom2,
        dto2,
        counter,
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
    handleLanguage();
  }
  return (
    <div className="work-exp-container">
      <div className="input-container">
        <h2>Education</h2>
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
      <div className="ac-container">
        {counter < 3 && (
          <div className="input-container column">
            <h4>Education One</h4>

            <Textfield
              type="text"
              placeholder="Education One"
              id="edu1"
              label="Education One"
              setState={setEdu1}
              value={edu1}
            />
          </div>
        )}
        {counter < 3 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="School"
              id="school1"
              label="School"
              setState={setSchool1}
              value={school1}
            />
          </div>
        )}
        {counter < 3 && (
          <div className="input-container">
            <Datefield
              type="date"
              placeholder="From"
              id="dfrom1"
              label="From"
              setState={setDFrom1}
              value={dfrom1}
            />
            <Datefield
              type="date"
              placeholder="To"
              id="dto1"
              label="To"
              setState={setDTo1}
              value={dto1}
            />
          </div>
        )}
      </div>

      {/* Experience Two  */}
      <div className="ac-container">
        {counter > 0 && counter < 3 && (
          <div className="input-container column">
            <h4>Education Two</h4>

            <Textfield
              type="text"
              placeholder="Education Two"
              id="edu2"
              label="Education Two"
              setState={setEdu2}
              value={edu2}
            />
          </div>
        )}
        {counter > 0 && counter < 3 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="School"
              id="school2"
              label="School"
              setState={setSchool2}
              value={school2}
            />
          </div>
        )}
        {counter > 0 && counter < 3 && (
          <div className="input-container">
            <Datefield
              type="date"
              placeholder="From"
              id="dfrom2"
              label="From"
              setState={setDFrom2}
              value={dfrom2}
            />
            <Datefield
              type="date"
              placeholder="To"
              id="dto2"
              label="To"
              setState={setDTo2}
              value={dto2}
            />
          </div>
        )}
      </div>

      {/* Button */}
      <div className="input-container">
        {counter < 2 && (
          <button onClick={handleCountAdd} className="signup-button">
            Add
          </button>
        )}
        {counter > 0 && counter < 3 && (
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
              edu1,
              school1,
              dfrom1,
              dto1,
              edu2,
              school2,
              dfrom2,
              dto2,
              counter,
            })
          }
        >
          {(loading && "Loading") || "Next"}
        </button>
        {/* <button onClick={handleLanguage} className="signup-button">
          Next
        </button> */}
      </div>
    </div>
  );
}
