import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
// import { Grid, Box } from "@mui/material";

export default function Skill({ session }) {
  const [loading, setLoading] = useState(true);
  const [skill1, setSkill1] = useState(null);
  const [skill2, setSkill2] = useState(null);
  const [skill3, setSkill3] = useState(null);
  const [skill4, setSkill4] = useState(null);
  const [skill5, setSkill5] = useState(null);
  const [skill6, setSkill6] = useState(null);
  const [skill7, setSkill7] = useState(null);
  const [skill8, setSkill8] = useState(null);
  const [skill9, setSkill9] = useState(null);
  const [skill10, setSkill10] = useState(null);
  const [skill11, setSkill11] = useState(null);
  const [skill12, setSkill12] = useState(null);
  const [count, setCount] = useState(0);

  function handleCountAdd() {
    setCount((prev) => prev + 1);
  }
  function handleCountMinus() {
    setCount((prev) => prev - 1);
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
        .select(
          `skill1,skill2,skill3,skill4,skill5,skill6,skill7,skill8,skill9,skill10,skill11,skill12, count`
        ) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setSkill1(data.skill1); //
        setSkill2(data.skill2);
        setSkill3(data.skill3);
        setSkill4(data.skill4);
        setSkill5(data.skill5);
        setSkill6(data.skill6);
        setSkill7(data.skill7);
        setSkill8(data.skill8);
        setSkill9(data.skill9);
        setSkill10(data.skill10);
        setSkill11(data.skill11);
        setSkill12(data.skill12);
        setCount(data.count);
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
        skill1,
        skill2,
        skill3,
        skill4,
        skill5,
        skill6,
        skill7,
        skill8,
        skill9,
        skill10,
        skill11,
        skill12,
        count,
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
        {count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill One"
              id="skill1"
              label="Skill One"
              setState={setSkill1}
              value={skill1}
            />
          </div>
        )}
        {count > 0 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Two"
              id="skill2"
              label="Skill Two"
              setState={setSkill2}
              value={skill2}
            />
          </div>
        )}
      </div>
      <div className="acc-container">
        {count > 1 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Three"
              id="skill3"
              label="Skill Three"
              setState={setSkill3}
              value={skill3}
            />
          </div>
        )}
        {count > 2 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Four"
              id="skill4"
              label="Skill Four"
              setState={setSkill4}
              value={skill4}
            />
          </div>
        )}
      </div>
      <div className="acc-container">
        {count > 3 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Five"
              id="skill5"
              label="Skill Five"
              setState={setSkill5}
              value={skill5}
            />
          </div>
        )}
        {count > 4 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Six"
              id="skill6"
              label="Skill Six"
              setState={setSkill6}
              value={skill6}
            />
          </div>
        )}
      </div>
      <div className="acc-container">
        {count > 5 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Seven"
              id="skill7"
              label="Skill Seven"
              setState={setSkill7}
              value={skill7}
            />
          </div>
        )}
        {count > 6 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Eight"
              id="skill8"
              label="Skill Eight"
              setState={setSkill8}
              value={skill8}
            />
          </div>
        )}
      </div>
      <div className="acc-container">
        {count > 7 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Nine"
              id="skill9"
              label="Skill Nine"
              setState={setSkill9}
              value={skill9}
            />
          </div>
        )}
        {count > 8 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Ten"
              id="skill10"
              label="Skill Ten"
              setState={setSkill10}
              value={skill10}
            />
          </div>
        )}
      </div>
      <div className="acc-container">
        {count > 9 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Eleven"
              id="skill11"
              label="Skill Eleven"
              setState={setSkill11}
              value={skill11}
            />
          </div>
        )}
        {count > 10 && count < 12 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Skill Twelve"
              id="skill12"
              label="Skill Twelve"
              setState={setSkill12}
              value={skill12}
            />
          </div>
        )}
      </div>
      <div className="input-container">
        {count < 12 && (
          <button onClick={handleCountAdd} className="signup-button">
            Add Skill
          </button>
        )}
        {count > 0 && count < 12 && (
          <button onClick={handleCountMinus} className="signup-button">
            Remove Skill
          </button>
        )}

        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              skill1,
              skill2,
              skill3,
              skill4,
              skill5,
              skill6,
              skill7,
              skill8,
              skill9,
              skill10,
              skill11,
              skill12,
              count,
            })
          }
        >
          {(loading && "Loading") || "update"}
        </button>
      </div>
    </div>
  );
}
