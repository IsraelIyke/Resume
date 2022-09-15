import { Grid, Box } from "@mui/material";
import bg from "../images/bg2.png";

export default function Dashboard({
  session,
  handleBasicInfo,
  handlePassword,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} className="dashboard-container">
        <Grid item xs={12} className="account-container">
          <div>Welcome {session.user.email}</div>
        </Grid>
        <Grid item xs={12} className="account-container">
          <img src={bg} alt="resume" width={200} height={200} />
        </Grid>
        <Grid item xs={12} className="account-container">
          <button className="signup-button" onClick={handleBasicInfo}>
            Edit Resume
          </button>
        </Grid>
        <Grid item xs={12} className="account-container">
          <button className="signup-button" onClick={handlePassword}>
            Change Password
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}
