import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
    setMove(!move);
  };
  const [move, setMove] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <header>
            <h3>
              <Link to="/">cVit</Link>
            </h3>
            <nav ref={navRef}>
              <Link to="/">Home</Link>
              <Link to="/auth">Login</Link>
            </nav>
            {move ? (
              <button className="nav-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            ) : (
              <button className="nav-btn" onClick={showNavbar}>
                <HiMenuAlt2 />
              </button>
            )}
          </header>
        </Grid>
      </Grid>
    </Box>
  );
}
