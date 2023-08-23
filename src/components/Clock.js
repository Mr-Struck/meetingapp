import React, { useEffect, useState } from "react";

export const Clock = () => {
  const [dateTime, setDateTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setDateTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToTwoDigit = (number) => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
      <div className="date">
        <span>
          Today's Date: {convertToTwoDigit(dateTime.day)}/
          {convertToTwoDigit(dateTime.month)}/{dateTime.year}
        </span>
      </div>
      <div className="clock" style={{ width: 220 }}>
        <span>Current Time: </span>
        <span>
          {dateTime.hours > 12
            ? convertToTwoDigit(dateTime.hours - 12)
            : convertToTwoDigit(dateTime.hours)}
        </span>
        :<span>{convertToTwoDigit(dateTime.minutes)}</span>:
        <span>{convertToTwoDigit(dateTime.seconds)}</span>
        <span>{dateTime.hours >= 12 ? " PM" : " AM"}</span>
      </div>
    </div>
  );
};
