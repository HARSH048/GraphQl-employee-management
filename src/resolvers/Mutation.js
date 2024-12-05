const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const checkRole = require('../utils/checkRole')
const bcrypt = require('bcryptjs');

const Mutation = {
  addEmployee: async (_, { name, age, class: empClass, subjects, role, password,email },context) => {
    checkRole(['admin', 'employee'])(_, {}, context);
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ name, age, class: empClass, subjects, role, password: hashedPassword, email });
    return await employee.save();
  },
  updateEmployee: async (_, { id, name, age, class: empClass, subjects, attendance },context) => {
    checkRole(['admin'])(_, {}, context);
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, age, class: empClass, subjects, attendance },
      { new: true }
    );
    return updatedEmployee;
  },
   login: async(_, { email, password },context)=> {
    checkRole(['admin','employee'])(_, {}, context);
    const user = await Employee.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token, user };
  }

  // Other existing mutations like addEmployee, updateEmployee
};

module.exports = Mutation;
