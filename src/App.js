import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import "./App.css";
import Auth from "./pages/Auth";
import { P404 } from "./pages/404";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<P404 />} />
        </Routes>
      </Router>
    </>
  );
}