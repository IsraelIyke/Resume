import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Grid, Box } from "@mui/material";
import Textfield from "../pages/Textfield/textfield";

export default function BasicInfo({ session }) {
const [loading, setLoading] = useState(true);
const [username, setUsername] = useState(null);
const [firstName, setFirstName] = useState(null);
const [lastName, setLastName] = useState(null);

const [profession, setProfession] = useState(null);
const [city, setCity] = useState(null);
const [states, setState] = useState(null);
const [zipCode, setZipCode] = useState(null);
const [phone, setPhone] = useState(null);
const [linkedIn, setLinkedIn] = useState(null);

const [website, setWebsite] = useState(null);
const [avatar_url, setAvatarUrl] = useState(null);

useEffect(() => {
getProfile();
}, [session]);

async function getProfile() {
try {
setLoading(true);
const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

}

async function updateProfile({ username, website, avatar_url }) {
try {
setLoading(true);
const user = supabase.auth.user();
const updates = {
id: user.id,
username,
website,
avatar_url,
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
<Box sx={{ flexGrow: 1 }}>
<Grid container spacing={2}>
<form className="account-form-container">
<Grid item xs={12}>
<h2>Contact Info</h2>
<br />
</Grid>
<div className="input-container">
<Grid item xs={6}>
<Textfield
type="text"
placeholder={firstName || "First Name"}
id="firstName"
label="First Name"
setState={setFirstName}
value={firstName}
classname="span"
/>
</Grid>

            <Grid item xs={6}>
              <Textfield
                type="text"
                placeholder={lastName || "Last Name"}
                id="lastName"
                label="Last Name"
                setState={setLastName}
                value={lastName}
                classname="span"
              />
            </Grid>
          </div>
          <div className="input-container">
            <Grid item xs={6}>
              <Textfield
                type="text"
                placeholder={profession || "Profession"}
                id="profession"
                label="Profession"
                setState={setProfession}
                value={profession}
                classname="span"
              />
            </Grid>
            <Grid item xs={6}>
              <Textfield
                type="text"
                placeholder={city || "City"}
                id="city"
                label="City"
                setState={setCity}
                value={city}
                classname="span"
              />
            </Grid>
          </div>
          <div className="input-container">
            <Grid item xs={6}>
              <Textfield
                type="text"
                placeholder={states || "State"}
                id="states"
                label="State"
                setState={setState}
                value={states}
                classname="span"
              />
            </Grid>
            <Grid item xs={6}>
              <Textfield
                type="text"
                placeholder={zipCode || "Zip Code"}
                id="zipCode"
                label="Zip Code"
                setState={setZipCode}
                value={zipCode}
                classname="span"
              />
            </Grid>
          </div>
          <div className="input-container">
            <Grid item xs={6}>
              <Textfield
                type="text"
                placeholder={phone || "Phone"}
                id="phone"
                label="Phone"
                setState={setPhone}
                value={phone}
                classname="span"
              />
            </Grid>
            <Grid item xs={6}>
              <Textfield
                type="text"
                placeholder={linkedIn || "LinkedIn"}
                id="linkedIn"
                label="LinkedIn"
                setState={setLinkedIn}
                value={linkedIn}
                classname="span"
              />
            </Grid>
          </div>
          <Grid item xs={6}>
            <button
              className="signup-button"
              onClick={() => updateProfile({ username, website, avatar_url })}
            >
              {(loading && "Loading") || "update"}
            </button>
          </Grid>
        </form>
      </Grid>
    </Box>

);
}
