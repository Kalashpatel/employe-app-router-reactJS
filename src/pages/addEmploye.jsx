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

  function handleImageChange(e){
    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setEmployee(prev => ({
        ...prev,
        image : reader.result
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
          <label>Email : </label>
          <input
            type="email"
            name="email"
            value={employee.email}
            placeholder="Enter your Email ID"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number : </label>
          <input
            type="number"
            name="number"
            value={employee.number}
            placeholder="Enter your phone number"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Department : </label>
          <input
            type="text"
            name="department"
            value={employee.department}
            placeholder="Enter your Department"
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

        <div>
          <label>Image URL : </label>
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div>
          <label>Status : </label>
          <select name="status" value={employee.status} onChange={handleChange}>
            <option>active</option>
            <option>inactive</option>
          </select>
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </>
  );
}
