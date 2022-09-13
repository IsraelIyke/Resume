import Nav from "../AccountComponent/nav";
import "../AccountComponent/account.css";
import BasicInfo from "../AccountComponent/BasicInfo";
import Dashboard from "../AccountComponent/Dashboard";
import { useState } from "react";
import { Grid, Box, Paper } from "@mui/material";
import TemplateOne from "../AccountComponent/TemplateOne";

export default function Account({ session }) {
  const [home, setHome] = useState(true);
  const [basicInfo, setBasicInfo] = useState(false);
  const [templateOne, setTemplateOne] = useState(false);
  function handleBasicInfo() {
    setHome(false);
    setBasicInfo(true);
    setTemplateOne(false);
  }
  function handleTemplateOne() {
    setHome(false);
    setBasicInfo(false);
    setTemplateOne(true);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Nav key={session.user.id} session={session} />
        </Grid>
        <Grid item xs={1} md={3}>
          <Paper className="account-side">
            <h4>Infomation</h4>
            <p onClick={handleBasicInfo}>Contact Info</p>
            <p>Background Brief</p>
            <p>Work History</p>
            <p>Education</p>
            <p>Skills</p>
            <p>Language</p>
            <h4>Template</h4>
            <p onClick={handleTemplateOne}>Template One</p>
            <p>Template Two</p>
            <h4>Editing</h4>
            <p>Edit Details</p>
          </Paper>
        </Grid>
        <Grid item xs={11} md={9}>
          <Grid item xs={12} className="account-container">
            {home && (
              <Dashboard
                key={session.user.id}
                session={session}
                handleBasicInfo={handleBasicInfo}
              />
            )}
          </Grid>
          <Grid item xs={12} className="account-container">
            {basicInfo && <BasicInfo key={session.user.id} session={session} />}
          </Grid>
          <Grid item xs={12} className="account-container">
            {templateOne && (
              <TemplateOne key={session.user.id} session={session} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
