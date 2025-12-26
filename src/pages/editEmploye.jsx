import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmploye() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
  })

  useEffect(() => {

    const allEmployee = JSON.parse(localStorage.getItem("employees")) || [];

    const existingEmp = allEmployee.find((emp) => String(emp.id) === String(id));

    if(existingEmp){
        setEmployee(existingEmp);
    }

  },[id]);

  function handleSubmit(e){
    e.preventDefault()

    const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];

    const updatedList = allEmployees.map((emp) => 
        String(emp.id) === String(id) ? employee : emp
    );

    localStorage.setItem("employees", JSON.stringify(updatedList));

    alert("employee details updated succesfully");
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
    navigate("/viewEmploye");
  }
  function handleChange(e){

    const {name, value} = e.target;
    setEmployee((prev) => ({
        ...prev,
        [name] : value,
    }));

  }
  function handleImageChange(e){
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onloadend = () => {
            setEmployee((prev) => ({
                ...prev,
                image : reader.result,
            }))
        }
        reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit} style={{color: "white"}}>
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
                disabled
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
                color="white"
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
                disabled
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
            <td><label>Current Image : </label></td>
              <td>
                {employee.image && <img src={employee.image} alt="preview" width="50" />}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
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
              <button type="submit" className="add-btn">Edit Employee</button>
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}
