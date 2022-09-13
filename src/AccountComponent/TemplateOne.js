import { Box, Grid } from "@mui/material";
import "../TemplateComponent/templateOne.css";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import linkedin from "../images/linkedin.png";
import email from "../images/email.png";

export default function TemplateOne({ session }) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null); //
  const [lastName, setLastName] = useState(null);
  const [profession, setProfession] = useState(null);
  const [city, setCity] = useState(null);
  const [states, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
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
          `firstName, lastName,
          profession,
          city,
          states,
          zipCode,
          phone,
          linkedIn, skill1,skill2,skill3,skill4,skill5,skill6,skill7,skill8,skill9,skill10,skill11,skill12`
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
        setCity(data.city);
        setState(data.states);
        setZipCode(data.zipCode);
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
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
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
                {firstName}
                {lastName}
              </h3>
              <h4>{profession}</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a
                tellus eu dolor ultricies faucibus. Cras vel efficitur nunc.
                Vestibulum at tempor felis. Morbi rhoncus sapien et lorem
              </p>
              <hr />
              <div className="temp-social">
                <p className="temp-email">
                  <img src={email} alt="e" />
                  {session.user.email}
                </p>
                <p className="temp-linkedin">
                  <img src={linkedin} alt="i" />
                  {linkedIn}
                </p>
              </div>
              <hr />
              {/* skills starts here */}
            </div>
            {/* end here */}
            <div className="temp-skill-container">
              <h3>SKILLS</h3>
              <div className="temp-skill-list">
                {skill1 != null && <div className="temp-skill">{skill1}</div>}
                {skill2 != null && <div className="temp-skill">{skill2}</div>}
                {skill3 != null && <div className="temp-skill">{skill3}</div>}
                {skill4 != null && <div className="temp-skill">{skill4}</div>}
                {skill5 != null && <div className="temp-skill">{skill5}</div>}
                {skill6 != null && <div className="temp-skill">{skill6}</div>}
                {skill7 != null && <div className="temp-skill">{skill7}</div>}
                {skill8 != null && <div className="temp-skill">{skill8}</div>}
                {skill9 != null && <div className="temp-skill">{skill9}</div>}
                {skill10 != null && <div className="temp-skill">{skill10}</div>}
                {skill11 != null && <div className="temp-skill">{skill11}</div>}
                {skill12 != null && <div className="temp-skill">{skill12}</div>}
              </div>
            </div>
            <p>Hello Template</p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
