import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
// import { Grid, Box } from "@mui/material";

export default function BgInfo({ session }) {
  const [loading, setLoading] = useState(true);
  const [bgInfo, SetBgInfo] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

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

  async function updateProfile({ firstName }) {
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
      <div className="acc-container">
        <div className="input-container">
          <Textfield
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
      </div>
    </div>
  );
}
