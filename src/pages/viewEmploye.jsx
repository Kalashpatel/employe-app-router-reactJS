import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ViewEmploye() {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );

  function deleteEmployee(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedList = employees.filter((emp) => emp.id !== id);

      localStorage.setItem("employees", JSON.stringify(updatedList));

      setEmployees(updatedList);
    }
  }

  return (
    <>
      <h2 style={{ marginBottom: "40px", fontSize: "40px" }}>View Employee</h2>

      <table border={1} cellPadding={20} cellSpacing={0}>
        <thead>
          <tr>
            <td>Employee ID</td>
            <td>Image</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Department</td>
            <td>Designation</td>
            <td>Salary</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.empId}</td>
                <td>
                  {emp.image ? (
                    <img
                      src={emp.image}
                      alt={emp.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.number}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.salary}</td>
                <td>{emp.status}</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    borderBottom: "1px solid #444",
                    minHeight: "50px",
                  }}
                >
                  <Link to={`/editEmploye/${emp.id}`}>Edit</Link>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    style={{
                      padding: "5px",
                      width: "auto",
                      background: "transparent",
                      fontSize: "16px",
                      color: "crimson",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
