import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate("/auth");
    }
  }, [count, navigate]);

  return (
    <div>
      Page Not Found
      <br /> Redirecting you to Login Page in{" "}
      {count !== 1 ? `${count} seconds` : `${count} second`}
    </div>
  );
};
