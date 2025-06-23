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

exports.updateEmployee = async (req, res) => {      
    const { name, department, position } = req.body;
    const employee = await Employee.findByIdAndUpdate(req.params.id, { name, department, position }, { new: true });
    
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json({ message: 'Employee updated successfully', employee });
    };


exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted successfully' });
};
