import React from "react";
import "../css/table.css";
import moment from "moment";
import "moment-timezone";

export const Table = ({ tableData }) => {
  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Email</th>
            <th>Organizer</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Internal Meeting</th>
            <th>Duration</th>
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
                <td>
                  {moment(`${item?.date}Z`).tz("Asia/Kolkata").format("h:mm a")}
                </td>
                <td>
                  {moment(`${item?.end_date}Z`)
                    .tz("Asia/Kolkata")
                    .format("h:mm a")}
                </td>
                <td>{item?.internal_meeting ? "Yes" : "No"}</td>
                <td>{item?.duration} mins</td>
                <td>{item?.department}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
