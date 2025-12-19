const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    roll: String,
    password: String,
    subject1: Number,
    subject2: Number,
    subject3: Number
});

module.exports = mongoose.model('Student', studentSchema);
