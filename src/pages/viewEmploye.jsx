import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ViewEmploye() {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortType, setSortType] = useState("");

  function deleteEmployee(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedList = employees.filter((emp) => emp.id !== id);

      localStorage.setItem("employees", JSON.stringify(updatedList));

      setEmployees(updatedList);
    }
  }

  const filteredAndSortedEmployees = employees
    .filter((emp) => {
      // Search Logic
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      // Filter Logic
      const matchesFilter = filterStatus === "All" || emp.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      // Sorting Logic
      if (sortType === "name-asc") return a.name.localeCompare(b.name);
      if (sortType === "name-desc") return b.name.localeCompare(a.name);
      if (sortType === "sal-low") return a.salary - b.salary;
      if (sortType === "sal-high") return b.salary - a.salary;
      return 0;
    });

  return (
    <>
      <h2 style={{ marginBottom: "40px", fontSize: "40px" }}>View Employee</h2>

      <div className="search-tab">
        <div className="container">
          <div className="row">
           
            <div className="col-6">
              <label>Search employee: </label>
              <input
                type="text"
                placeholder="Enter employee name"
                className="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            
            <div className="col-3">
              <label>Filter Status: </label>
              <select onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            
            <div className="col-3">
              <label>Sort By: </label>
              <select onChange={(e) => setSortType(e.target.value)}>
                <option value="">Default</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
                <option value="sal-low">Salary: Low-High</option>
                <option value="sal-high">Salary: High-Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <table border={1} cellPadding={20} cellSpacing={0} style={{ marginTop: "20px", width: "100%" }}>
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
          
          {filteredAndSortedEmployees.length > 0 ? (
            filteredAndSortedEmployees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.empId}</td>
                <td>
                  {emp.image ? (
                    <img
                      src={emp.image}
                      alt={emp.name}
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  ) : "No Image"}
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.number}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.salary}</td>
                <td>{emp.status}</td>
                <td>
                  <Link to={`/editEmploye/${emp.id}`}>Edit</Link>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    style={{ color: "crimson", border: "none", background: "none", cursor: "pointer", marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
