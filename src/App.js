import React from "react";
import { Route, Routes } from "react-router-dom";
import { Map } from "./pages/Map";
import { RegistrationForm } from "./pages/RegistrationForm";
import { Login } from "./pages/Login";
import { Meeting } from "./pages/Meeting";
import { ForgetPassword } from "./pages/ForgetPassword";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<Map />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/forget" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
};
export default App;
