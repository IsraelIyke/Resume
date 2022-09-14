import { useEffect, useState } from "react";
import { supabase } from "../client";
// import { Grid, Box } from "@mui/material";
import Inputfield from "./Inputfield/inputfield";

export default function BgInfo({ session }) {
const [loading, setLoading] = useState(true);
const [bgInfo, SetBgInfo] = useState(null);

useEffect(() => {
getProfile();
}, [session]);

const myArray = bgInfo.split(" ");
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
      alert(error.message);
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
<h2>Background Brief</h2>
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
} >
{(loading && "Loading") || "update"}
</button>
</div>
</div>
);
}
