import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Grid, Box } from "@mui/material";
import Textfield from "../pages/Textfield/textfield";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import \* as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BasicInfo({ session }) {
const [loading, setLoading] = useState(true);
const [username, setUsername] = useState(null);
const [firstName, setFirstName] = useState(null);
const [lastName, setLastName] = useState(null);

const [website, setWebsite] = useState(null);
const [avatar_url, setAvatarUrl] = useState(null);
const [open, setOpen] = useState(false);
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage(error.message);
      handle();
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

      handleClick();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

}
return (
<Box sx={{ flexGrow: 1 }}>
<Grid container spacing={2}>
<Grid item>
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
<Alert
onClose={handleClose}
severity="success"
sx={{ width: "100%" }} >
This is a success message!
</Alert>
</Snackbar>
<Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
<Alert
onClose={handleClose}
severity="error"
sx={{ width: "100%" }} >
{errorMessage === "Request Failed"
? "Please check internet connection"
: errorMessage}
</Alert>
</Snackbar>
</Grid>
{/_ <form className="account-container"> _/}
<Grid item xs={12} className="account-container">
<Textfield
type="text"
placeholder={firstName || "First Name"}
id="firstName"
label="First Name"
setState={setFirstName}
value={firstName}
/>
</Grid>

        <Grid item xs={12} className="account-container">
          <Textfield
            type="text"
            placeholder={firstName || "Last Name"}
            id="lastName"
            label="Last Name"
            setState={setLastName}
            value={lastName}
          />
        </Grid>

        <Grid item xs={12} className="account-container">
          <button
            className="signup-button"
            onClick={() => updateProfile({ username, website, avatar_url })}
          >
            {(loading && "Loading") || "update"}
          </button>
        </Grid>
        {/* </form> */}
      </Grid>
    </Box>

);
}
