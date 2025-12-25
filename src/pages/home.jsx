import React, { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("employees")) || [];

    if (savedData) {
      setEmployees(savedData);
    }
  }, []);

  return (
    <>
      <h2>Employee Managment System</h2>

      <section>
        <div className="container">
          <div className="row">
            {employees.length > 0 ? (
              employees.map((emp) => (
                <div className="col-3">
                  <div className="employee-card">
                    <ul
                      style={{
                        fontSize: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <li>
                        {emp.image ? (
                          <img
                            src={emp.image}
                            alt={emp.name}
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </li>
                      <li>{emp.empId}</li>
                      <li>{emp.name}</li>
                      <li>{emp.email}</li>
                      <li>{emp.number}</li>
                      <li>{emp.department}</li>
                      <li>{emp.designation}</li>
                      <li>{emp.status}</li>
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>
                No employees found.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
