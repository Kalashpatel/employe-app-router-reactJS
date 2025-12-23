import React, { useState } from "react";

export default function AddEmploye() {
  const [employee, setEmployee] = useState({
    empId: "",
    name: "",
    designation: "",
    salary: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const existingEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    existingEmployees.push(employee);

    localStorage.setItem(
      "employees",
      JSON.stringify(existingEmployees)
    );

    alert("Employee added successfully!");

    setEmployee({
      empId: "",
      name: "",
      designation: "",
      salary: ""
    });
  }

  return (
    <>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee Id : </label>
          <input
            type="text"
            name="empId"
            value={employee.empId}
            placeholder="Enter your Employee Id"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={employee.name}
            placeholder="Enter your Name"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Designation : </label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            placeholder="Enter your Designation"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Salary : </label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            placeholder="Enter your Salary"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </>
  );
}
