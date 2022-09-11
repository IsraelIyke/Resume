import Nav from "../AccountComponent/nav";
import "../AccountComponent/account.css";
import BasicInfo from "../AccountComponent/BasicInfo";
import Dashboard from "../AccountComponent/Dashboard";
import { useState } from "react";
import { Grid, Box } from "@mui/material";

export default function Account({ session }) {
  const [home, setHome] = useState(true);
  const [basicInfo, setBasicInfo] = useState(false);
  function handleBasicInfo() {
    setHome(false);
    setBasicInfo(true);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Nav key={session.user.id} session={session} />
        </Grid>
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
      </Grid>
    </Box>
  );
}
