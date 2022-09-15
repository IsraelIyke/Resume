import { useState } from "react";
import Textfield from "../pages/Textfield/textfield";
import { supabase } from "../client";

export default function Password({ session }) {
  const [pass, setPass] = useState(null);
  async function handleChange() {
    const { user, error } = await supabase.auth.update({
      password: pass,
    });
  }

  return (
    <>
      <div className="input-container">
        <h2>Change Password</h2>
        <div className="input-container">
          <Textfield
            type="password"
            placeholder="Change password"
            id="pass"
            label="Change password"
            setState={setPass}
            value={pass}
          />
        </div>
        <div className="input-container">
          <button
            className="signup-button"
            onClick={() =>
              Password({
                pass,
              })
            }
          ></button>
        </div>
      </div>
    </>
  );
}
