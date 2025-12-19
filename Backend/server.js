const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    roll: String,
    password: String,
    subject1: Number,
    subject2: Number,
    subject3: Number,
    photo: String
});

const Student = mongoose.model("Student", studentSchema);

// Multer config for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
const upload = multer({ storage });

// POST – Add student with photo
app.post("/addStudent", upload.single("photo"), async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            roll: req.body.roll,
            password: req.body.password,
            subject1: Number(req.body.subject1),
            subject2: Number(req.body.subject2),
            subject3: Number(req.body.subject3),
            photo: req.file ? `/uploads/${req.file.filename}` : ""
        });
        await student.save();
        res.json({ message: "Student Added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding student" });
    }
});

// GET – All students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// PUT – Update student
app.put("/students/:id", async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Student Updated" });
});

// DELETE – Delete student
app.delete("/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted" });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
