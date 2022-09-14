import { Box, Grid } from "@mui/material";
import "../TemplateComponent/templateOne.css";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import linkedin from "../images/linkedin.png";
import email from "../images/email.png";
import mobile from "../images/mobile.png";
import location from "../images/location.png";
import temp from "../images/temp1.jpg";

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
  //   experience one
  const [exp1, setExp1] = useState(null);
  const [company1, setCompany1] = useState(null);
  const [from1, setFrom1] = useState(null);
  const [to1, setTo1] = useState(null);
  const [ach1a, setAch1a] = useState(null);
  const [ach1b, setAch1b] = useState(null);
  const [ach1c, setAch1c] = useState(null);

  //   experience two
  const [exp2, setExp2] = useState(null);
  const [company2, setCompany2] = useState(null);
  const [from2, setFrom2] = useState(null);
  const [to2, setTo2] = useState(null);
  const [ach2a, setAch2a] = useState(null);
  const [ach2b, setAch2b] = useState(null);
  const [ach2c, setAch2c] = useState(null);

  //   experience three
  const [exp3, setExp3] = useState(null);
  const [company3, setCompany3] = useState(null);
  const [from3, setFrom3] = useState(null);
  const [to3, setTo3] = useState(null);
  const [ach3a, setAch3a] = useState(null);
  const [ach3b, setAch3b] = useState(null);
  const [ach3c, setAch3c] = useState(null);
  //   education one
  const [edu1, setEdu1] = useState(null);
  const [school1, setSchool1] = useState(null);
  const [dfrom1, setDFrom1] = useState(null);
  const [dto1, setDTo1] = useState(null);

  //   education two
  const [edu2, setEdu2] = useState(null);
  const [school2, setSchool2] = useState(null);
  const [dfrom2, setDFrom2] = useState(null);
  const [dto2, setDTo2] = useState(null);
  // language
  const [language1, setLanguage1] = useState(null);
  const [language2, setLanguage2] = useState(null);
  const [language3, setLanguage3] = useState(null);
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
          linkedIn, bgInfo, skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11, skill12, exp1,
          company1,
          from1,
          to1,
          ach1a,
          ach1b,
          ach1c,
          exp2,
          company2,
          from2,
          to2,
          ach2a,
          ach2b,
          ach2c,
          exp3,
          company3,
          from3,
          to3,
          ach3a,
          ach3b,
          ach3c, edu1,
          school1,
          dfrom1,
          dto1,
          edu2,
          school2,
          dfrom2,
          dto2, language1,language2,language3`
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
        setExp1(data.exp1);
        setCompany1(data.company1);
        setFrom1(data.from1);
        setTo1(data.to1);
        setAch1a(data.ach1a);
        setAch1b(data.ach1b);
        setAch1c(data.ach1c);
        setExp2(data.exp2);
        setCompany2(data.company2);
        setFrom2(data.from2);
        setTo2(data.to2);
        setAch2a(data.ach2a);
        setAch2b(data.ach2b);
        setAch2c(data.ach2c);
        setExp3(data.exp3);
        setCompany3(data.company3);
        setFrom3(data.from3);
        setTo3(data.to3);
        setAch3a(data.ach3a);
        setAch3b(data.ach3b);
        setAch3c(data.ach3c);
        setEdu1(data.edu1);
        setSchool1(data.school1);
        setDFrom1(data.dfrom1);
        setDTo1(data.dto1);
        setEdu2(data.edu2);
        setSchool2(data.school2);
        setDFrom2(data.dfrom2);
        setDTo2(data.dto2);
        setLanguage1(data.language1); //
        setLanguage2(data.language2);
        setLanguage3(data.language3);
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
            <div>
              <img className="A4-img" src={temp} alt="bg" />
            </div>
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
            <div className="temp-skill-container">
              <h3>WORK EXPERIENCE</h3>
              <div className="temp-skill-list list-item">
                <Grid container>
                  <Grid item xs={12}>
                    {exp1 != null && <div className="temp-exp">{exp1}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    {company1 != null && (
                      <div className="temp-company">{company1}</div>
                    )}
                  </Grid>
                  <Grid item xs={2.2}>
                    {from1 != null && <div className="temp-date">{from1}</div>}
                  </Grid>
                  <Grid item xs={0.1}>
                    {to1 != null && <div className="temp-dash">-</div>}
                  </Grid>

                  <Grid item xs={2.2}>
                    {to1 != null && <div className="temp-date">{to1}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    <ul className="temp-list">
                      {ach1a != null && <li>{ach1a}</li>}
                      {ach1b != null && <li>{ach1b}</li>}
                      {ach1c != null && <li>{ach1c}</li>}
                    </ul>
                  </Grid>
                </Grid>
              </div>

              {/* two */}
              <div className="temp-skill-list list-item">
                <Grid container>
                  <Grid item xs={12}>
                    {exp2 != null && <div className="temp-exp">{exp2}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    {company2 != null && (
                      <div className="temp-company">{company2}</div>
                    )}
                  </Grid>
                  <Grid item xs={2.2}>
                    {from2 != null && <div className="temp-date">{from2}</div>}
                  </Grid>
                  <Grid item xs={0.1}>
                    {to2 != null && <div className="temp-dash">-</div>}
                  </Grid>

                  <Grid item xs={2.2}>
                    {to2 != null && <div className="temp-date">{to2}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    <ul className="temp-list">
                      {ach2a != null && <li>{ach2a}</li>}
                      {ach2b != null && <li>{ach2b}</li>}
                      {ach2c != null && <li>{ach2c}</li>}
                    </ul>
                  </Grid>
                </Grid>
              </div>
              {/* three */}
              <div className="temp-skill-list list-item">
                <Grid container>
                  <Grid item xs={12}>
                    {exp3 != null && <div className="temp-exp">{exp3}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    {company3 != null && (
                      <div className="temp-company">{company3}</div>
                    )}
                  </Grid>
                  <Grid item xs={2.2}>
                    {from3 != null && <div className="temp-date">{from3}</div>}
                  </Grid>
                  <Grid item xs={0.1}>
                    {to3 != null && <div className="temp-dash">-</div>}
                  </Grid>

                  <Grid item xs={2.2}>
                    {to3 != null && <div className="temp-date">{to3}</div>}
                  </Grid>
                  <Grid item xs={12}>
                    <ul className="temp-list">
                      {ach3a != null && <li>{ach3a}</li>}
                      {ach3b != null && <li>{ach3b}</li>}
                      {ach3c != null && <li>{ach3c}</li>}
                    </ul>
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="temp-skill-container">
              <h3>EDUCATION</h3>
              <Grid container>
                <Grid item xs={6}>
                  <div className="temp-skill-list list-item">
                    <Grid container>
                      <Grid item xs={12}>
                        {edu1 != null && <div className="temp-exp">{edu1}</div>}
                      </Grid>
                      <Grid item xs={12}>
                        {school1 != null && (
                          <div className="temp-company">{school1}</div>
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        {dfrom1 != null && (
                          <div className="temp-date">{dfrom1}</div>
                        )}
                      </Grid>
                      <Grid item xs={0.1}>
                        {dto1 != null && <div className="temp-dashs">-</div>}
                      </Grid>

                      <Grid item xs={4}>
                        {dto1 != null && (
                          <div className="temp-date">{dto1}</div>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  {/* two */}
                  <div className="temp-skill-list list-item">
                    <Grid container>
                      <Grid item xs={12}>
                        {edu2 != null && <div className="temp-exp">{edu2}</div>}
                      </Grid>
                      <Grid item xs={12}>
                        {school2 != null && (
                          <div className="temp-company">{school2}</div>
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        {dfrom2 != null && (
                          <div className="temp-date">{dfrom2}</div>
                        )}
                      </Grid>
                      <Grid item xs={0.1}>
                        {dto2 != null && <div className="temp-dashs">-</div>}
                      </Grid>

                      <Grid item xs={4}>
                        {dto2 != null && (
                          <div className="temp-date">{dto2}</div>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* language */}
            <div className="temp-skill-container">
              <h3>LANGUAGES</h3>
              <div className="temp-skill-list">
                <Grid container>
                  <Grid item>
                    {language1 != null && (
                      <div className="temp-skill">{language1}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {language2 != null && (
                      <div className="temp-skill">{language2}</div>
                    )}
                  </Grid>
                  <Grid item>
                    {language3 != null && (
                      <div className="temp-skill">{language3}</div>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>

            {/* <p>Hello Template</p> */}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
