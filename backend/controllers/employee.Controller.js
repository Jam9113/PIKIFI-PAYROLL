const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.createEmployee = async (req, res) => {
  const { name, department, position } = req.body;
  const employee = new Employee({ name, department, position });
  await employee.save();
  res.json({ message: 'Employee added successfully' });
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted successfully' });
};
