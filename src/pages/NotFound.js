import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img404 from "../images/404 error with a tired person-amico.png";
import "../css/notfound.css";
import { GppMaybeTwoTone } from "@mui/icons-material";

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
    <div className="notfound">
      <div className="contain">
        <div className="img-contain">
          <img src={img404} alt="404" />
        </div>
        <div className="head">
          <h1>
            <GppMaybeTwoTone style={{ fontSize: "10.5rem" }} />
          </h1>
          <p>
            <span>404, the Page not Found</span>
          </p>
          Redirecting you to <span>Login Page</span> in{" "}
          {count !== 1 ? `${count} seconds` : `${count} second`}
        </div>
      </div>
    </div>
  );
};
