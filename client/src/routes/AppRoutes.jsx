import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavbarApp } from "../components/Navbar/NavbarApp";
import { Login } from "../pages/Auth/Login/Login";
import { Register } from "../pages/Auth/Register/Register";
import { Home } from "../pages/Dashboard/Home/Home";
import { User } from "../pages/user/user";
import { FooterApp } from "../components/FooterApp/FooterApp";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavbarApp />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<User />} />
      </Routes>
      <FooterApp />
    </BrowserRouter>
  );
};
