import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmploye() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    empId: "",
    name: "",
    email: "",
    number: "",
    department: "",
    designation: "",
    salary: "",
    image: "",
    status: "active",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setEmployee((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  const fileInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    // New employee
    const newEmployee = {
      id: Date.now(),
      ...employee,
    };

    const existingEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    existingEmployees.push(newEmployee);

    localStorage.setItem("employees", JSON.stringify(existingEmployees));

    alert("Employee added successfully!");

    setEmployee({
      empId: "",
      name: "",
      email: "",
      number: "",
      department: "",
      designation: "",
      salary: "",
      image: "",
      status: "active",
    });

    fileInputRef.current.value = "";

    navigate("/viewEmploye");
  }

  return (
    <>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit} className="addForm">
        <table cellPadding={10}>
          <tr>
            <td>
              <label>Employee Id : </label>
            </td>
            <td>
              <input
                type="text"
                name="empId"
                value={employee.empId}
                placeholder="Enter your Employee Id"
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Name : </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={employee.name}
                placeholder="Enter your Name"
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Email : </label>
            </td>
            <td>
              <input
                type="email"
                name="email"
                value={employee.email}
                placeholder="Enter your Email ID"
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Phone Number : </label>
            </td>
            <td>
              <input
                type="number"
                name="number"
                value={employee.number}
                placeholder="Enter your phone number"
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Department : </label>
            </td>
            <td>
              <input
                type="text"
                name="department"
                value={employee.department}
                placeholder="Enter your Department"
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Designation : </label>
            </td>
            <td>
              <input
                type="text"
                name="designation"
                value={employee.designation}
                placeholder="Enter your Designation"
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Salary : </label>
            </td>
            <td>
              <input
                type="number"
                name="salary"
                value={employee.salary}
                placeholder="Enter your Salary"
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Image URL : </label>
            </td>
            <td>
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Status : </label>
            </td>
            <td>
              <select
                name="status"
                value={employee.status}
                onChange={handleChange}
              >
                <option>active</option>
                <option>inactive</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button type="submit" className="add-btn">Add Employee</button>
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}
