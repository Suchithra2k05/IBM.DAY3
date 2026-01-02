import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const addStudent = async () => {
    if (!name || !department || !age) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, department, age })
    });

    const data = await res.json();
    setStudents([...students, data]);

    setName("");
    setDepartment("");
    setAge("");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>🎓 Student Management System</h1>

        <div className="form">
          <input
            placeholder="Student Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="Department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
          />
          <input
            placeholder="Age"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
          <button onClick={addStudent}>Add Student</button>
        </div>

        <h2>Student List</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.department}</td>
                <td>{s.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
