import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Home from "../Frontend/Pages/Home";
import AdminHome from "../Backend/AdminHome";
import Auth from "../Auth/Auth";
import { useGlobalContext } from "./Context";
import AdminAuth from "../Auth/AdminAuth";




const Pages = () => {

  const { user, adminuser } = useGlobalContext()



  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>


        <Route path="/" element={<Auth />} />
        <Route path="/adminauth" element={<AdminAuth />} />



        {
          user ?
            <>
              <>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/detail/:id" element={<Home />} />
              </>

              <>
                {
                  adminuser !== 'null' ? <>
                    <Route path="/admin" element={<AdminHome />} />

                    <Route path="/admin/detail/:id" element={<AdminHome />} />


                  </> :
                    <Route path="/adminauth" element={<AdminAuth />} />

                }

              </>

            </>

            :

            <Route path="/" element={<Auth />} />

        }

        {/* 
        <Route path="/adminauth" element={<AdminAuth />} />
        <Route path="/admin" element={<AdminHome />} />

        {
          user && <>
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Home />} />
          </>
        }


        {
          adminuser !== 'null' && user && <>
            <Route path="/admin" element={<AdminHome />} />

            <Route path="/admin/detail/:id" element={<AdminHome />} />


          </>
        } */}




































      </Routes>
    </AnimatePresence>
  );
};

export default Pages;

<Route path="*" element={<Home />} />