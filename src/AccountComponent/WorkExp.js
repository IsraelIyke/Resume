import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
import Datefield from "./DatePicker/datefield";
import Inputfield from "./Inputfield/inputfield";
// import { Grid, Box } from "@mui/material";

export default function WorkExp({ session }) {
  const [loading, setLoading] = useState(true);
  //   experience one
  const [exp1, setExp1] = useState(null);
  const [company1, setCompany1] = useState(null);
  const [from1, setFrom1] = useState(null);
  const [to1, setTo1] = useState(null);
  const [ach1a, setAch1a] = useState(null);
  const [ach1b, setAch1b] = useState(null);
  const [ach1c, setAch1c] = useState(null);
  const [count1, setCount1] = useState(0);

  //   experience two
  const [exp2, setExp2] = useState(null);
  const [company2, setCompany2] = useState(null);
  const [from2, setFrom2] = useState(null);
  const [to2, setTo2] = useState(null);
  const [ach2a, setAch2a] = useState(null);
  const [ach2b, setAch2b] = useState(null);
  const [ach2c, setAch2c] = useState(null);
  const [count2, setCount2] = useState(0);

  //   experience three
  const [exp3, setExp3] = useState(null);
  const [company3, setCompany3] = useState(null);
  const [from3, setFrom3] = useState(null);
  const [to3, setTo3] = useState(null);
  const [ach3a, setAch3a] = useState(null);
  const [ach3b, setAch3b] = useState(null);
  const [ach3c, setAch3c] = useState(null);
  const [count3, setCount3] = useState(0);

  const [counts, setCounts] = useState(0);
  console.log(count1);
  function handleCountAdd() {
    setCounts((prev) => prev + 1);
  }
  function handleCount1Add() {
    setCount1((prev) => prev + 1);
  }
  function handleCount2Add() {
    setCount2((prev) => prev + 1);
  }
  function handleCount3Add() {
    setCount3((prev) => prev + 1);
  }

  function handleCountMinus() {
    setCounts((prev) => prev - 1);
    if (counts === 1) setExp2(null);
    if (counts === 2) setExp3(null);
  }
  function handleCount1Minus() {
    setCount1((prev) => prev - 1);
    if (count1 === 1) setAch1b(null);
    if (count1 === 2) setAch1c(null);
  }
  function handleCount2Minus() {
    setCount2((prev) => prev - 1);
    if (count2 === 1) setAch2b(null);
    if (count2 === 2) setAch2c(null);
  }
  function handleCount3Minus() {
    setCount3((prev) => prev - 1);
    if (count3 === 1) setAch3b(null);
    if (count3 === 2) setAch3c(null);
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
          `exp1,
          company1,
          from1,
          to1,
          ach1a,
          ach1b,
          ach1c,
          count1, exp2,
          company2,
          from2,
          to2,
          ach2a,
          ach2b,
          ach2c,
          count2,
          exp3,
          company3,
          from3,
          to3,
          ach3a,
          ach3b,
          ach3c,
          count3, counts`
        ) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setExp1(data.exp1);
        setCompany1(data.exp1);
        setFrom1(data.exp1);
        setTo1(data.exp1);
        setAch1a(data.exp1);
        setAch1b(data.exp1);
        setAch1c(data.exp1);
        setCount1(data.exp1);
        setExp2(data.exp1);
        setCompany2(data.exp1);
        setFrom2(data.exp1);
        setTo2(data.exp1);
        setAch2a(data.exp1);
        setAch2b(data.exp1);
        setAch2c(data.exp1);
        setCount2(data.exp1);
        setExp3(data.exp1);
        setCompany3(data.exp1);
        setFrom3(data.exp1);
        setTo3(data.exp1);
        setAch3a(data.exp1);
        setAch3b(data.exp1);
        setAch3c(data.exp1);
        setCount3(data.exp1);
        setCounts(data.counts);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    exp1,
    company1,
    from1,
    to1,
    ach1a,
    ach1b,
    ach1c,
    count1,
    exp2,
    company2,
    from2,
    to2,
    ach2a,
    ach2b,
    ach2c,
    count2,
    exp3,
    company3,
    from3,
    to3,
    ach3a,
    ach3b,
    ach3c,
    count3,
    counts,
  }) {
    //
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id, //
        exp1,
        company1,
        from1,
        to1,
        ach1a,
        ach1b,
        ach1c,
        count1,
        exp2,
        company2,
        from2,
        to2,
        ach2a,
        ach2b,
        ach2c,
        count2,
        exp3,
        company3,
        from3,
        to3,
        ach3a,
        ach3b,
        ach3c,
        count3,
        counts,
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
        <h2>Work Experience</h2>
      </div>
      <div className="ac-container">
        {counts < 4 && (
          <div className="input-container column">
            <h4>Work Experience One</h4>

            <Textfield
              type="text"
              placeholder="Experience One"
              id="exp1"
              label="Experience One"
              setState={setExp1}
              value={exp1}
            />
          </div>
        )}
        {counts < 4 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Company"
              id="company1"
              label="Company"
              setState={setCompany1}
              value={company1}
            />
          </div>
        )}
        {counts < 4 && (
          <div className="input-container">
            <Datefield
              type="date"
              placeholder="From"
              id="from1"
              label="From"
              setState={setFrom1}
              value={from1}
            />
            <Datefield
              type="date"
              placeholder="To"
              id="to1"
              label="To"
              setState={setTo1}
              value={to1}
            />
          </div>
        )}

        <div className="input-container">
          {count1 < 2 && (
            <button onClick={handleCount1Add} className="signup-button">
              Add Achievement
            </button>
          )}
          {count1 > 0 && count1 < 3 && (
            <button onClick={handleCount1Minus} className="signup-button">
              Remove Achievement
            </button>
          )}
        </div>

        {counts < 4 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement One. Please limit to 15 words"
              id="ach1a"
              label="Achievement One"
              setState={setAch1a}
              value={ach1a}
            />
          </div>
        )}
        {counts < 4 && count1 > 0 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Two. Please limit to 15 words"
              id="ach1b"
              label="Achievement Four"
              setState={setAch1b}
              value={ach1b}
            />
          </div>
        )}
        {counts < 4 && count1 > 1 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Three. Please limit to 15 words"
              id="ach1c"
              label="Achievement Three"
              setState={setAch1c}
              value={ach1c}
            />
          </div>
        )}
      </div>

      {/* Experience Two  */}
      <div className="ac-container">
        {counts > 0 && counts < 3 && (
          <div className="input-container column">
            <h4>Work Experience Two</h4>

            <Textfield
              type="text"
              placeholder="Experience Two"
              id="exp2"
              label="Experience Two"
              setState={setExp2}
              value={exp2}
            />
          </div>
        )}
        {counts > 0 && counts < 3 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Company"
              id="company2"
              label="Company"
              setState={setCompany2}
              value={company2}
            />
          </div>
        )}
        {counts > 0 && counts < 4 && (
          <div className="input-container">
            <Datefield
              type="date"
              placeholder="From"
              id="from2"
              label="From"
              setState={setFrom2}
              value={from2}
            />
            <Datefield
              type="date"
              placeholder="To"
              id="to2"
              label="To"
              setState={setTo2}
              value={to2}
            />
          </div>
        )}

        <div className="input-container">
          {count1 < 2 && (
            <button onClick={handleCount1Add} className="signup-button">
              Add Achievement
            </button>
          )}
          {count1 > 0 && count1 < 3 && (
            <button onClick={handleCount1Minus} className="signup-button">
              Remove Achievement
            </button>
          )}
        </div>

        {counts < 4 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement One. Please limit to 15 words"
              id="ach1a"
              label="Achievement One"
              setState={setAch1a}
              value={ach1a}
            />
          </div>
        )}
        {counts < 4 && count1 > 0 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Two. Please limit to 15 words"
              id="ach1b"
              label="Achievement Four"
              setState={setAch1b}
              value={ach1b}
            />
          </div>
        )}
        {counts < 4 && count1 > 1 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Three. Please limit to 15 words"
              id="ach1c"
              label="Achievement Three"
              setState={setAch1c}
              value={ach1c}
            />
          </div>
        )}
      </div>

      {/* Three */}
      <div className="ac-container">
        {counts > 0 && counts < 4 && (
          <div className="input-container column">
            <h4>Work Experience One</h4>

            <Textfield
              type="text"
              placeholder="Experience One"
              id="exp1"
              label="Experience One"
              setState={setExp1}
              value={exp1}
            />
          </div>
        )}
        {counts > 0 && counts < 4 && (
          <div className="input-container">
            <Textfield
              type="text"
              placeholder="Company"
              id="company1"
              label="Company"
              setState={setExp1}
              value={company1}
            />
          </div>
        )}
        {counts > 0 && counts < 4 && (
          <div className="input-container">
            <Datefield
              type="date"
              placeholder="From"
              id="from1"
              label="From"
              setState={setFrom1}
              value={from1}
            />
            <Datefield
              type="date"
              placeholder="To"
              id="to1"
              label="To"
              setState={setTo1}
              value={to1}
            />
          </div>
        )}

        <div className="input-container">
          {count1 < 3 && (
            <button onClick={handleCount1Add} className="signup-button">
              Add Achievement
            </button>
          )}
          {count1 > 0 && count1 < 4 && (
            <button onClick={handleCount1Minus} className="signup-button">
              Remove Achievement
            </button>
          )}
        </div>

        {counts < 4 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement One. Please limit to 15 words"
              id="ach1a"
              label="Achievement One"
              setState={setAch1a}
              value={ach1a}
            />
          </div>
        )}
        {counts < 4 && count1 > 0 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Two. Please limit to 15 words"
              id="ach1b"
              label="Achievement Four"
              setState={setAch1b}
              value={ach1b}
            />
          </div>
        )}
        {counts < 4 && count1 > 1 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Three. Please limit to 15 words"
              id="ach1c"
              label="Achievement Three"
              setState={setAch1c}
              value={ach1c}
            />
          </div>
        )}
      </div>

      {/* Button */}
      <div className="input-container">
        {counts < 2 && (
          <button onClick={handleCountAdd} className="signup-button">
            Add Experience
          </button>
        )}
        {counts > 0 && counts < 3 && (
          <button onClick={handleCountMinus} className="signup-button">
            Remove Experience
          </button>
        )}

        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              exp1,
              company1,
              from1,
              to1,
              ach1a,
              ach1b,
              ach1c,
              count1,
              exp2,
              company2,
              from2,
              to2,
              ach2a,
              ach2b,
              ach2c,
              count2,
              exp3,
              company3,
              from3,
              to3,
              ach3a,
              ach3b,
              ach3c,
              count3,
              counts,
            })
          }
        >
          {(loading && "Loading") || "update"}
        </button>
      </div>
    </div>
  );
}
