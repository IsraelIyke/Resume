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

export default function BasicInfo({ session, handleBgInfo }) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null); //
  const [lastName, setLastName] = useState(null);
  const [profession, setProfession] = useState(null);
  const [country, setCountry] = useState(null);
  const [states, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);
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

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `firstName, lastName,
        profession,
        country,
        states,
        zipCode,
        phone,
        linkedIn`
        ) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setFirstName(data.firstName); //
        setLastName(data.lastName);
        setProfession(data.profession);
        setCountry(data.country);
        setState(data.states);
        setZipCode(data.zipCode);
        setPhone(data.phone);
        setLinkedIn(data.linkedIn);
      }
    } catch (error) {
      // alert(error.message);
      handles();
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ firstName }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id,

        firstName, //
        lastName,
        profession,
        country,
        states,
        zipCode,
        phone,
        linkedIn,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", //don't return the value after inserting
      });

      if (error) {
        throw error;
      }

      handleClick();
    } catch (error) {
      setErrorMessage(error.message);
      handle();
    } finally {
      setLoading(false);
    }
    handleBgInfo();
  }
  return (
    <div>
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
        <h2>Contact Info</h2>
      </div>
      <div className="acc-container">
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="FirstName"
            id="firstName"
            label="First Name"
            setState={setFirstName}
            value={firstName}
          />
        </div>
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="LastName"
            id="lastName"
            label="Last Name"
            setState={setLastName}
            value={lastName}
          />
        </div>
      </div>
      <div className="acc-container">
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="Profession"
            id="profession"
            label="Profession"
            setState={setProfession}
            value={profession}
          />
        </div>
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="country"
            id="country"
            label="country"
            setState={setCountry}
            value={country}
          />
        </div>
      </div>
      <div className="acc-container">
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="State"
            id="states"
            label="State"
            setState={setState}
            value={states}
          />
        </div>
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="Zip Code"
            id="zipCode"
            label="Zip Code"
            setState={setZipCode}
            value={zipCode}
          />
        </div>
      </div>
      <div className="acc-container">
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="Phone"
            id="phone"
            label="Phone"
            setState={setPhone}
            value={phone}
          />
        </div>
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="LinkedIn"
            id="linkedIn"
            label="LinkedIn"
            setState={setLinkedIn}
            value={linkedIn}
          />
        </div>
      </div>
      <div className="input-container">
        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              firstName,
              lastName,
              profession,
              country,
              states,
              zipCode,
              phone,
              linkedIn,
            })
          }
        >
          {(loading && "Loading") || "Next"}
        </button>

        {/* <button onClick={handleBgInfo} className="signup-button">
          Next
        </button> */}
      </div>
    </div>
  );
}
