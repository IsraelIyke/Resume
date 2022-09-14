import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
// import { Grid, Box } from "@mui/material";

export default function Language({ session }) {
  const [loading, setLoading] = useState(true);
  const [language1, setLanguage1] = useState(null);
  const [language2, setLanguage2] = useState(null);
  const [language3, setLanguage3] = useState(null);

  const [counting, setCounting] = useState(0);

  function handleCountAdd() {
    setCounting((prev) => prev + 1);
  }
  function handleCountMinus() {
    setCounting((prev) => prev - 1);
    if (counting === 2) setLanguage3(null);
    if (counting === 1) setLanguage2(null);
  }
  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`language1, language2, language3, counting`) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setLanguage1(data.language1); //
        setLanguage2(data.language2);
        setLanguage3(data.language3);
        setCounting(data.counting);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ language1, language2, language3, counting }) {
    //
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id, //
        language1,
        language2,
        language3,
        counting,
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
        {counting < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Language One"
              id="language1"
              label="Language One"
              setState={setLanguage1}
              value={language1}
            />
          </div>
        )}
        {counting > 0 && counting < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Language Two"
              id="language2"
              label="Language Two"
              setState={setLanguage2}
              value={language2}
            />
          </div>
        )}
      </div>
      <div className="acc-container">
        {counting > 1 && counting < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Language Three"
              id="language3"
              label="Language Three"
              setState={setLanguage3}
              value={language3}
            />
          </div>
        )}
      </div>
      <div className="input-container">
        {counting < 2 && (
          <button onClick={handleCountAdd} className="signup-button">
            Add
          </button>
        )}
        {counting > 0 && counting < 3 && (
          <button onClick={handleCountMinus} className="signup-button">
            Remove
          </button>
        )}

        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              language1,
              language2,
              language3,
              counting,
            })
          }
        >
          {(loading && "Loading") || "update"}
        </button>
      </div>
    </div>
  );
}