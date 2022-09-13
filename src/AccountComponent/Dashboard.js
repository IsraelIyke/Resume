import { Grid, Box } from "@mui/material";
import bg from "../images/bg2.png";

export default function Dashboard({ session, handleBasicInfo }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} className="account-container">
          <div>Welcome {session.user.email}</div>
        </Grid>
        <Grid item xs={12} className="account-container">
          <img src={bg} alt="resume" width={400} height={400} />
        </Grid>
        <Grid item xs={12} className="account-container">
          <button className="signup-button" onClick={handleBasicInfo}>
            Create Resume
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}
