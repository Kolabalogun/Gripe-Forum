import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Dashboard from "../Backend/Pages/Dashboard";
import Home from "../Frontend/Pages/Home";



const Pages = () => {

  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>

        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />

      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
