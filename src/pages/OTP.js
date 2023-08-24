import React, { useState } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export const OTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = () => {
    axios
      .post(`/send-otp/?email=${email}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setIsOtpSent(true);
      message.success("OTP sent successfully!");
    }, 1000);
  };

  const handleVerifyOtp = () => {
    axios
      .post(`/verify-otp/?email=${email}&entered_otp=${otp}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setIsOtpVerified(true);
      message.success("OTP verified successfully!");
    }, 1000);
  };

  const handleChangeOtp = (event) => {
    const enteredOtp = event.target.value;
    setOtp(enteredOtp);

    // Automatically trigger OTP verification when OTP length is correct
    if (enteredOtp.length === 7) {
      handleVerifyOtp();
    } else {
      setIsOtpVerified(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>OTP Verification</h1>
      <Input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter OTP"
        value={otp}
        onChange={handleChangeOtp}
        maxLength={7}
        suffix={
          isOtpVerified ? (
            <span>
              <CheckOutlined />
            </span>
          ) : isOtpVerified === false ? (
            <span>
              <CloseOutlined />
            </span>
          ) : null
        }
      />
      {!isOtpSent && (
        <Button type="primary" onClick={handleSendOtp}>
          Send OTP
        </Button>
      )}
    </div>
  );
};
