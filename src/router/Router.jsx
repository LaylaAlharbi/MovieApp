import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Main from "../pages/Main";
import MovieDetail from "../pages/MovieDetail";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import Login from "../pages/Login";
function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;