const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String },
  subjects: [{ type: String }],
  attendance: { type: Number, default: 0 },
  role: { type: String, enum: ['admin', 'employee'], required: true },
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
