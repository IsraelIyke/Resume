import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
// import { Grid, Box } from "@mui/material";

export default function Password({ session, handleDashboard }) {
  const [password, setPassword] = useState(null);

  async function updateProfile({ password }) {
    //
    try {
      let { error } = await supabase.auth.update({
        email: session.user.email,
        password: password,
      });

      if (error) {
        throw error;
      }

      alert("updated");
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <div className="input-container">
        <h2>Change Password</h2>
      </div>
      <div className="acc-container">
        <div className="input-container">
          <Textfield
            type="text"
            placeholder="Change Password"
            id="password"
            label="Change Password"
            setState={setPassword}
            value={password}
          />
        </div>
      </div>

      <div className="input-container">
        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              password,
            })
          }
        >
          update
        </button>
        <button className="signup-button" onClick={handleDashboard}>
          Back
        </button>
      </div>
    </div>
  );
}
