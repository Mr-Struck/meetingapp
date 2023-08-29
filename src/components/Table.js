import React from "react";
import "../css/table.css";

export const Table = ({ tableData }) => {
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
          {tableData &&
            tableData.map((item) => (
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
