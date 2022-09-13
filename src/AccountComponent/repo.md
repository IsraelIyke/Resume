import { useEffect, useState } from "react";
import { supabase } from "../client";
import PersonalAvatar from "../pages/PersonalAvatar";
import { Grid, Box } from "@mui/material";

export default function BasicInfo({ session }) {
const [loading, setLoading] = useState(true);
const [username, setUsername] = useState(null);
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
<div className="account-container">
<div>
<PersonalAvatar
url={avatar_url}
onUpload={(url) => {
setAvatarUrl(url);
updateProfile({ username, website, avatar_url: url });
}}
/>
</div>
<br />
<div>{session.user.email}</div>
<div>
<input
type="text"
value={username || ""}
onChange={(e) => setUsername(e.target.value)}
placeholder={username || "username"}
/>
<br />
<input
type="text"
value={website || ""}
onChange={(e) => setWebsite(e.target.value)}
placeholder={website || "website"}
/>
</div>

      <br />
      <button onClick={() => updateProfile({ username, website, avatar_url })}>
        {(loading && "Loading") || "update"}
      </button>
    </div>

);
}
