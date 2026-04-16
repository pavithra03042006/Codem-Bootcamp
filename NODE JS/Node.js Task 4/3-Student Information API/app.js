const express = require("express");

const app = express();
const PORT = 3000;

const students = [
  { id: 1, name: "Sai", course: "CSE", age: 21 },
  { id: 2, name: "Anu", course: "ECE", age: 20 },
  { id: 3, name: "Rahul", course: "IT", age: 22 },
  { id: 4, name: "Meena", course: "EEE", age: 19 },
  { id: 5, name: "Kavin", course: "MECH", age: 21 }
];

function isValidStudent(student) {
  return (
    student.id !== undefined &&
    student.name !== undefined &&
    student.course !== undefined &&
    student.age !== undefined
  );
}

app.use("/students", (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/students", (req, res) => {
  const validStudents = students.filter(isValidStudent);

  if (validStudents.length !== students.length) {
    return res.status(500).json({ message: "Invalid student data found" });
  }

  res.status(200).json(students);
});

app.get("/students/count", (req, res) => {
  res.status(200).json({ totalStudents: students.length });
});

app.get("/students/names", (req, res) => {
  const names = students.map(student => student.name);
  res.status(200).json({ names });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});