import React from "react";
import { Route, Routes } from "react-router-dom";
import { Map } from "./pages/Map";
import { RegistrationForm } from "./pages/RegistrationForm";
import { Login } from "./pages/Login";
import { Meeting } from "./pages/Meeting";
import { ForgetPassword } from "./pages/ForgetPassword";
import Auth from "./layout/Auth";
import User from "./layout/User";
import { NotFound } from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="/auth/registration" element={<RegistrationForm />} />
          <Route path="/auth/forget" element={<ForgetPassword />} />
        </Route>

        <Route path="/" element={<User />}>
          <Route index element={<Map />} />
          <Route path="/meeting" element={<Meeting />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;
