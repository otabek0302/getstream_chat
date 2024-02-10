import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
