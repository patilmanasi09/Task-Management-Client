import React from "react";
import Navbar from "../components/Navbar";
import Asidebar from "../components/Asidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
   <>
  <Navbar />

  <Asidebar />

  <div
  style={{
    marginTop: "70px",
    marginLeft: "240px",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    padding: "20px",
    paddingBottom: "100px", // footer sathi extra space
  }}
>
  <Outlet />
</div>

  <Footer />
</>
  );
};

export default Layout;