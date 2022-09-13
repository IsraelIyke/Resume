import { Box, Grid } from "@mui/material";
import "../TemplateComponent/templateOne.css";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import { MdEmail } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";

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
          linkedIn`
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
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function generatePdf() {
    const doc = new jsPDF("p", "pt", "a4");
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a
                tellus eu dolor ultricies faucibus. Cras vel efficitur nunc.
                Vestibulum at tempor felis. Morbi rhoncus sapien et lorem
              </p>
              <hr />
              <div className="temp-social">
                <p className="temp-email">
                  {/* <MdEmail className="email-icon" /> */}
                  {session.user.email}
                </p>
                <p className="temp-linkedin">
                  {/* <AiFillLinkedin className="linkedin-icon" /> */}
                  {linkedIn}
                </p>
              </div>
              <hr />
            </div>
            <p>Hello Template</p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
