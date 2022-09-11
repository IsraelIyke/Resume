import { Grid, Box } from "@mui/material";
import bg from "../images/bg.jpg";

export default function Dashboard({ session, handleBasicInfo }) {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} className="account-container">
          <div>Welcome {session.user.email}</div>
        </Grid>
        <Grid item xs={12}>
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
