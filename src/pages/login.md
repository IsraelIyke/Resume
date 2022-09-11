import { useState } from "react";
import { supabase } from "../client";
import Nav from "./component/nav";
import { Grid, Box } from "@mui/material";

export default function Login() {
const [loading, setLoading] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (email) => {
try {
setLoading(true);
const { error } = await supabase.auth.signIn({ email, password });
if (error) {
throw error;
} else {
alert("This is a success message!");
}
} catch (error) {
alert("This is an error message!");
alert(error.message);
} finally {
setLoading(false);
}
};
return (
<Box sx={{ flexGrow: 1 }} className="container">
<Grid container spacing={2} justifyContent="center">
<Grid item xs={12}>
<Nav />
</Grid>
<Grid item>
<Grid item>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</Grid>
<Grid item></Grid>
<Grid item>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
</Grid>
</Grid>
<Grid item>
<button
onClick={(e) => {
e.preventDefault();
handleLogin(email);
}} >
{(loading && "loading") || "Login"}
</button>
</Grid>
</Grid>
</Box>
);
}
