const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { name, roll, password, subjects } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await Student.create({
    name,
    roll,
    password: hashedPassword,
    subjects
  });

  res.json({ message: 'Student Registered' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { roll, password } = req.body;

  const student = await Student.findOne({ roll });
  if (!student) return res.status(400).json({ msg: 'User not found' });

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

  res.json({ msg: 'Login successful', name: student.name });
});

module.exports = router;
