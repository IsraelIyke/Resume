import { useEffect, useState } from "react";
import { supabase } from "../client";
import PersonalAvatar from "../pages/PersonalAvatar";
import Textfield from "../pages/Textfield/textfield";
// import { Grid, Box } from "@mui/material";

export default function BasicInfo({ session }) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null); //
  const [lastName, setLastName] = useState(null);
  const [profession, setProfession] = useState(null);
  const [city, setCity] = useState(null);
  const [states, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);

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
        city,
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
        setCity(data.city);
        setState(data.states);
        setZipCode(data.zipCode);
        setPhone(data.phone);
        setLinkedIn(data.linkedIn);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ firstName }) {
    //
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id,

        firstName, //
        lastName,
        profession,
        city,
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

      alert("updated");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
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
            placeholder="City"
            id="city"
            label="City"
            setState={setCity}
            value={city}
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
              city,
              states,
              zipCode,
              phone,
              linkedIn,
            })
          }
        >
          {(loading && "Loading") || "update"}
        </button>
      </div>
    </div>
  );
}
