import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Bg from "../images/bg_resume.jpg";
import Nav from "./component/nav";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }} className="container">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item xs={11} sm={7} md={6}>
          <div className="detail">
            <h1>Resume Generator</h1>
            Create your resume easily with cVit. cVit offers a simple and
            friendly user interface with numerous themes to choose from and edit
            to your liking
          </div>
        </Grid>
        <Grid item xs={10}>
          <img src={Bg} className="image" alt="resume" />
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <div className="button-container">
            <Link to="/register">
              <button className="button">Get Started</button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="footer">
            Copyright © 2022 ezy, All rights reserved
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
