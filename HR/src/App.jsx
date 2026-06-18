import React, { useState } from "react";

export default function App() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const submitLeave = () => {
    if (!employeeName || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }

    const newRequest = {
      id: Date.now(),
      employeeName,
      leaveType,
      startDate,
      endDate,
      status: "Pending",
    };

    setLeaveRequests([...leaveRequests, newRequest]);

    setEmployeeName("");
    setLeaveType("Casual Leave");
    setStartDate("");
    setEndDate("");
  };

  const updateStatus = (id, status) => {
    setLeaveRequests(
      leaveRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>HR Employee Leave Management</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Apply Leave</h2>

        <input
          type="text"
          placeholder="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option>Casual Leave</option>
          <option>Sick Leave</option>
          <option>Annual Leave</option>
        </select>

        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          onClick={submitLeave}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Leave Request
        </button>
      </div>

      <div>
        <h2>Leave Requests</h2>

        {leaveRequests.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.status}</td>
                  <td>
                    <button
                      onClick={() =>
                        updateStatus(request.id, "Approved")
                      }
                      style={{
                        marginRight: "5px",
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(request.id, "Rejected")
                      }
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}