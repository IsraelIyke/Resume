import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import "./App.css";
import Auth from "./pages/Auth";
import { P404 } from "./pages/404";
import ChangePassword from "./pages/PasswordChange";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Auth />} />
          <Route path="/password-recovery" element={<ChangePassword />} />
          <Route path="*" element={<P404 />} />
        </Routes>
      </Router>
    </>
  );
}
