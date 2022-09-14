import { useEffect, useState } from "react";
import { supabase } from "../client";
import Textfield from "../pages/Textfield/textfield";
import Datefield from "./DatePicker/datefield";
import Inputfield from "./Inputfield/inputfield";
// import { Grid, Box } from "@mui/material";

export default function WorkExp({ session }) {
const [loading, setLoading] = useState(true);
// experience one
const [exp1, setExp1] = useState(null);
const [company1, setCompany1] = useState(null);
const [from1, setFrom1] = useState(null);
const [to1, setTo1] = useState(null);
const [ach1a, setAch1a] = useState(null);
const [ach1b, setAch1b] = useState(null);
const [ach1c, setAch1c] = useState(null);
const [ach1d, setAch1d] = useState(null);
const [count1, setCount1] = useState(0);

// experience two
const [exp2, setExp2] = useState(null);
const [company2, setCompany2] = useState(null);
const [from2, setFrom2] = useState(null);
const [to2, setTo2] = useState(null);
const [ach2a, setAch2a] = useState(null);
const [ach2b, setAch2b] = useState(null);
const [ach2c, setAch2c] = useState(null);
const [ach2d, setAch2d] = useState(null);
const [count2, setCount2] = useState(0);

// experience three
const [exp3, setExp3] = useState(null);
const [company3, setCompany3] = useState(null);
const [from3, setFrom3] = useState(null);
const [to3, setTo3] = useState(null);
const [ach3a, setAch3a] = useState(null);
const [ach3b, setAch3b] = useState(null);
const [ach3c, setAch3c] = useState(null);
const [ach3d, setAch3d] = useState(null);
const [count3, setCount3] = useState(0);

// experience four
const [exp4, setExp4] = useState(null);
const [company4, setCompany4] = useState(null);
const [from4, setFrom4] = useState(null);
const [to4, setTo4] = useState(null);
const [ach4a, setAch4a] = useState(null);
const [ach4b, setAch4b] = useState(null);
const [ach4c, setAch4c] = useState(null);
const [ach4d, setAch4d] = useState(null);
const [count4, setCount4] = useState(0);

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
function handleCount4Add() {
setCount4((prev) => prev + 1);
}
function handleCountMinus() {
setCounts((prev) => prev - 1);
if (counts === 1) setExp2(null);
if (counts === 2) setExp3(null);
if (counts === 3) setExp4(null);
}
function handleCount1Minus() {
setCount1((prev) => prev - 1);
if (count1 === 1) setAch1b(null);
if (count1 === 2) setAch1c(null);
if (count1 === 3) setAch1d(null);
}
function handleCount2Minus() {
setCount2((prev) => prev - 1);
if (count2 === 1) setAch2b(null);
if (count2 === 2) setAch2c(null);
if (count2 === 3) setAch2d(null);
}
function handleCount3Minus() {
setCount3((prev) => prev - 1);
if (count3 === 1) setAch3b(null);
if (count3 === 2) setAch3c(null);
if (count3 === 3) setAch3d(null);
}
function handleCount4Minus() {
setCount4((prev) => prev - 1);
if (count4 === 1) setAch4b(null);
if (count4 === 2) setAch4c(null);
if (count4 === 3) setAch4d(null);
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
          exp2,
          exp3,
          exp4, counts`
        ) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setExp1(data.exp1); //
        setExp2(data.exp2);
        setExp3(data.exp3);
        setExp4(data.exp4);
        setCounts(data.counts);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

}

async function updateProfile({ exp1, exp2, exp3, exp4, counts }) {
//
try {
setLoading(true);
const user = supabase.auth.user();
const updates = {
id: user.id, //
exp1,
exp2,
exp3,
exp4,
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
              setState={setExp1}
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
        {counts < 4 && count1 > 2 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Four. Please limit to 15 words"
              id="ach1d"
              label="Achievement Four"
              setState={setAch1d}
              value={ach1d}
            />
          </div>
        )}
      </div>

      {/* Experience Two  */}
      {/*  {counts > 0 && counts < 4 && (*/}
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
              setState={setExp1}
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
        {counts < 4 && count1 > 2 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Four. Please limit to 15 words"
              id="ach1d"
              label="Achievement Four"
              setState={setAch1d}
              value={ach1d}
            />
          </div>
        )}
      </div>

      {/* Three */}
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
              setState={setExp1}
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
        {counts < 4 && count1 > 2 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Four. Please limit to 15 words"
              id="ach1d"
              label="Achievement Four"
              setState={setAch1d}
              value={ach1d}
            />
          </div>
        )}
      </div>

      {/* Four */}
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
              setState={setExp1}
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
        {counts < 4 && count1 > 2 && count1 < 4 && (
          <div className="input-container">
            <Inputfield
              type="text"
              placeholder="Achievement Four. Please limit to 15 words"
              id="ach1d"
              label="Achievement Four"
              setState={setAch1d}
              value={ach1d}
            />
          </div>
        )}
      </div>

      {/* Button */}
      <div className="input-container">
        {counts < 12 && (
          <button onClick={handleCountAdd} className="signup-button">
            Add Experience
          </button>
        )}
        {counts > 0 && counts < 12 && (
          <button onClick={handleCountMinus} className="signup-button">
            Remove Experience
          </button>
        )}

        <button
          className="signup-button"
          onClick={() =>
            updateProfile({
              exp1,
              exp2,
              exp3,
              exp4,
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
