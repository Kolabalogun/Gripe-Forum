import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Home from "../Frontend/Pages/Home";
import AdminHome from "../Backend/AdminHome";
import Auth from "../Auth/Auth";
import { useGlobalContext } from "./Context";




const Pages = () => {

  const { user } = useGlobalContext()

  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>





        <Route path="*" element={<Home />} />

        {
          !user ? <Route path="/auth" element={<Auth />} /> :
            <>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminHome />} />

              <Route path="/admin/detail/:id" element={<AdminHome />} />

            </>
        }



      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
