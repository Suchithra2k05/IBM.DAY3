const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let students = [];

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.post("/api/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    department: req.body.department,
    age: req.body.age
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
