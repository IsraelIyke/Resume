import { Box, Grid } from "@mui/material";
import "../TemplateComponent/templateOne.css";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import linkedin from "../images/linkedin.png";
import email from "../images/email.png";
import mobile from "../images/mobile.png";
import location from "../images/location.png";

export default function TemplateOne({ session }) {
  const [firstName, setFirstName] = useState(null); //
  const [lastName, setLastName] = useState(null);
  const [profession, setProfession] = useState(null);
  const [country, setCountry] = useState(null);
  const [states, setState] = useState(null);
  const [phone, setPhone] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);
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
  const [bgInfo, SetBgInfo] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `firstName, lastName,
          profession,
          country,
          states,
          zipCode,
          phone,
          linkedIn, bgInfo, skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12`
        ) //
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setFirstName(data.firstName); //
        setLastName(data.lastName);
        setProfession(data.profession);
        setCountry(data.country);
        setState(data.states);
        setPhone(data.phone);
        setLinkedIn(data.linkedIn);
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
        SetBgInfo(data.bgInfo);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function generatePdf() {
    const doc = new jsPDF("p", "pt", "a4", true);

    doc.setFontSize(14);
    doc.setDrawColor(0, 0, 0);
    doc.internal.write(0, "Tw");
    doc.setCharSpace(1);
    doc.html(document.querySelector("#content"), {
      callback: function (pdf) {
        const pageCount = doc.internal.getNumberOfPages();
        pdf.deletePage(pageCount);
        pdf.save("myresume.pdf");
      },
    });
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7}>
          <button
            className="signup-button"
            onClick={generatePdf}
            type="primary"
          >
            Download Pdf
          </button>
        </Grid>
        <Grid item xs={7}>
          <div id="content" className="template-A4-container">
            <div className="name-detail">
              <h3>
                {firstName} {lastName}
              </h3>
              <h4>{profession}</h4>
              <p>{bgInfo}</p>
              <hr />
              <div className="temp-social">
                <Grid container>
                  <Grid item>
                    <div className="temp-email">
                      <img src={email} alt="e" />
                      {session.user.email}
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="temp-linkedin">
                      <img src={linkedin} alt="i" />
                      {linkedIn}
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="temp-phone">
                      <img src={mobile} alt="i" />
                      {phone}
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="temp-location">
                      <img src={location} alt="i" className="location-icon" />
                      {states}, {country}
                    </div>
                  </Grid>
                </Grid>
              </div>
              <hr />
              {/* skills starts here */}
            </div>
            {/* end here */}
            <div className="temp-skill-container">
              <h3>SKILLS</h3>
              <div className="temp-skill-list">
                <Grid container>
                  <Grid item>
                    {skill1 != null && (
                      <div className="temp-skill">{skill1}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill2 != null && (
                      <div className="temp-skill">{skill2}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill3 != null && (
                      <div className="temp-skill">{skill3}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill4 != null && (
                      <div className="temp-skill">{skill4}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill5 != null && (
                      <div className="temp-skill">{skill5}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill6 != null && (
                      <div className="temp-skill">{skill6}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill7 != null && (
                      <div className="temp-skill">{skill7}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill8 != null && (
                      <div className="temp-skill">{skill8}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill9 != null && (
                      <div className="temp-skill">{skill9}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill10 != null && (
                      <div className="temp-skill">{skill10}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill11 != null && (
                      <div className="temp-skill">{skill11}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {skill12 != null && (
                      <div className="temp-skill">{skill12}</div>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
            <p>Hello Template</p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
