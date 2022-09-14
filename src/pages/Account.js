import Nav from "../AccountComponent/nav";
import "../AccountComponent/account.css";
import BasicInfo from "../AccountComponent/BasicInfo";
import Dashboard from "../AccountComponent/Dashboard";
import { useState } from "react";
import { Grid, Box, Paper } from "@mui/material";
import TemplateOne from "../AccountComponent/TemplateOne";
import Skill from "../AccountComponent/Skill";
import BgInfo from "../AccountComponent/BgInfo";
import WorkExp from "../AccountComponent/WorkExp";
import Education from "../AccountComponent/Education";
import Language from "../AccountComponent/Language";

export default function Account({ session }) {
  const [home, setHome] = useState(true);
  const [basicInfo, setBasicInfo] = useState(false);
  const [templateOne, setTemplateOne] = useState(false);
  const [skill, setSkill] = useState(false);
  const [bgInfo, setBgInfo] = useState(false);
  const [workExp, setWorkExp] = useState(false);
  const [education, setEducation] = useState(false);
  const [language, setLanguage] = useState(false);

  function handleBasicInfo() {
    setHome(false);
    setBasicInfo(true);
    setTemplateOne(false);
    setSkill(false);
    setBgInfo(false);
    setWorkExp(false);
    setEducation(false);
    setLanguage(false);
  }
  function handleTemplateOne() {
    setHome(false);
    setBasicInfo(false);
    setTemplateOne(true);
    setSkill(false);
    setBgInfo(false);
    setWorkExp(false);
    setEducation(false);
    setLanguage(false);
  }
  function handleSkill() {
    setHome(false);
    setBasicInfo(false);
    setTemplateOne(false);
    setSkill(true);
    setBgInfo(false);
    setWorkExp(false);
    setEducation(false);
    setLanguage(false);
  }
  function handleBgInfo() {
    setHome(false);
    setBasicInfo(false);
    setTemplateOne(false);
    setSkill(false);
    setBgInfo(true);
    setWorkExp(false);
    setEducation(false);
    setLanguage(false);
  }
  function handleWorkExp() {
    setHome(false);
    setBasicInfo(false);
    setTemplateOne(false);
    setSkill(false);
    setBgInfo(false);
    setWorkExp(true);
    setEducation(false);
    setLanguage(false);
  }
  function handleEducation() {
    setHome(false);
    setBasicInfo(false);
    setTemplateOne(false);
    setSkill(false);
    setBgInfo(false);
    setWorkExp(false);
    setEducation(true);
    setLanguage(false);
  }
  function handleLanguage() {
    setHome(false);
    setBasicInfo(false);
    setTemplateOne(false);
    setSkill(false);
    setBgInfo(false);
    setWorkExp(false);
    setEducation(false);
    setLanguage(true);
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
            <p onClick={handleBgInfo}>Background Brief</p>
            <p onClick={handleSkill}>Skills</p>
            <p onClick={handleWorkExp}>Work Experience</p>
            <p onClick={handleEducation}>Education</p>
            <p onClick={handleLanguage}>Language</p>
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
          <Grid item xs={12} className="account-container">
            {skill && <Skill key={session.user.id} session={session} />}
          </Grid>
          <Grid item xs={12} className="account-container">
            {bgInfo && <BgInfo key={session.user.id} session={session} />}
          </Grid>
          <Grid item xs={12} className="account-container">
            {workExp && <WorkExp key={session.user.id} session={session} />}
          </Grid>
          <Grid item xs={12} className="account-container">
            {education && <Education key={session.user.id} session={session} />}
          </Grid>
          <Grid item xs={12} className="account-container">
            {language && <Language key={session.user.id} session={session} />}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
