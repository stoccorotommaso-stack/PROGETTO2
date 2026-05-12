const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let teachers = [
  { id: 1, name: "Prof.ssa Valenti", subject: "informatica" },
  { id: 2, name: "Prof.ssa Voria", subject: "italiano" },
  { id: 3, name: "Prof. Giannino", subject: "matematica" },
  { id: 4, name: "Prof. Lelli", subject: "tpsi" },
  { id: 5, name: "Prof. Giudice", subject: "laboratorio tpsi" },
  { id: 6, name: "Prof. Sorrentino", subject: "laboratorio sistemi" },
  { id: 7, name: "Prof. Terenzi", subject: "motoria" },
];

let notes = [
  { id: 1, teacherId: 1, text: "mangia in classe" },
  { id: 2, teacherId: 2, text: "Seconda nota e bastaaaaaasecondo" },
  { id: 3, teacherId: 3, text: "terza" },
];

let grades = [
  { id: 1, type: "orale", teacherId: "7", grade: 10 },
  { id: 2, type: "scritto", teacherId: "3", grade: 4 },
  { id: 3, type: "orale", teacherId: "2", grade: 5 },
];

// GET -> ottiene tutte le note
app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/grades", (req, res) => {
  res.json(grades);
});

app.get("/teachers", (req, res) => {
  res.json(teachers);
});

// POST -> aggiunge una nota
app.post("/notes", (req, res) => {
  const newNote = {
    id: notes.length + 1,
    text: req.body.text,
    teacherId: req.body.teacherId,
  };

  notes.push(newNote);

  res.json(newNote);
});

// POST -> aggiunge un voto
app.post("/grades", (req, res) => {
  const newGrade = {
    id: grades.length + 1,
    type: req.body.type,
    teacherId: req.body.teacherId,
    grade: req.body.grade,
  };

  grades.push(newGrade);

  res.json(newGrade);
});

// DELETE -> elimina una nota
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  notes = notes.filter((note) => note.id !== id);

  res.json({
    message: "Nota eliminata",
  });
});

// DELETE -> elimina un voto
app.delete("/grades/:id", (req, res) => {
  const id = parseInt(req.params.id);

  grades = grades.filter((grade) => grade.id !== id);

  res.json({
    message: "Voto eliminato",
  });
});

app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  notes = notes.filter((note) => note.id !== id);

  res.json({
    message: "Nota eliminata",
  });
});

app.listen(3000, () => {
  console.log("Server avviato su http://localhost:3000");
});
