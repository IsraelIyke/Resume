import { Box, Grid } from "@mui/material";
import React from "react";
import img404 from "../images/404.png";
import Nav from "./component/nav";

export const P404 = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item>
          <img src={img404} alt="404" width={550} height={550} />
        </Grid>
      </Grid>
    </Box>
  );
};
