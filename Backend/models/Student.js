const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  roll: { type: Number, unique: true },
  password: String, // hashed
  subjects: {
    sub1: Number,
    sub2: Number,
    sub3: Number
  }
});

module.exports = mongoose.model('Student', studentSchema);
