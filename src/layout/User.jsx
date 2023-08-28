import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  const checkIsLogin = () => {
    const isLogin = sessionStorage.getItem("isLogin");

    if (isLogin !== "true") {
      navigate("/auth");
    }
  };

  useEffect(() => {
    checkIsLogin();
  });

  return <Outlet />;
}
