import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { supabase } from "../client";

export default function Nav({ session }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <header className="header">
            <h3>
              <Link to="/">cVit</Link>
            </h3>
            <button onClick={() => supabase.auth.signOut()}>Logout</button>
          </header>
        </Grid>
      </Grid>
    </Box>
  );
}
