import { useState } from "react";
import Textfield from "../pages/Textfield/textfield";

export default function Password({ session }) {
  const [pass, setPass] = useState(null);
  async function handleChange() {
    const { user, error } = await supabase.auth.update({
      password: pass,
    });
  }

  return (
    <>
      <h2>Change Password</h2>
      <Textfield
        type="password"
        placeholder="Change password"
        id="pass"
        label="Change password"
        setState={setPass}
        value={pass}
      />
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
    </>
  );
}
