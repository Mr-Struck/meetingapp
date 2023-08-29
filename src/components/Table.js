import React, { useEffect, useState } from "react";
import "../css/table.css";
import { useToken } from "../context/TokenContext";

export const Table = () => {
  const [data, setData] = useState([]);

  const { accessToken } = useToken();

  useEffect(() => {
    fetch(`/aravalli/?token=${accessToken}`)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response.data);
        const dataWithSerial = response.data.map((item, index) => ({
          ...item,
          serialNumber: index + 1,
        }));
        setData(dataWithSerial);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken]);

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Date</th>
            <th>End Date</th>
            <th>Internal Meeting</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.serialNumber}>
              <td>{item?.serialNumber}</td>
              <td>{item?.email}</td>
              <td>{item?.full_name}</td>
              <td>{item?.date}</td>
              <td>{item?.end_date}</td>
              <td>{item?.internal_meeting ? "Yes" : "No"}</td>
              <td>{item?.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
