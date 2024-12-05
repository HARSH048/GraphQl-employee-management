const Employee = require('../models/Employee');
const checkRole = require('../utils/checkRole')

const Query = {
  listEmployees: async (_, { page = 1, limit = 10, sortBy = 'name', order = 'asc' },context) => {
    checkRole(['admin'])(_, {}, context);
    const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
    const employees = await Employee.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);
    return employees;
  },
  getEmployee: async (_, { id }) => {
    checkRole(['admin', 'employee'])(_, {}, context);
    return await Employee.findById(id);
  },
};

module.exports = Query;
