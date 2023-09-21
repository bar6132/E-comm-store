import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Allitem from "./Allitem";
import Cart from "./Cart";

function SiteRouters() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/All" element={<Allitem/>} />
        <Route path="/Cart" element={<Cart/>} />
        
      </Routes>
  );
}

export default SiteRouters;
