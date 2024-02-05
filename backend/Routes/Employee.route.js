const express = require('express');
const employeeRoute = express.Router();
const employeeModel = require("../Model/Employee");

// Get List Of Employees
employeeRoute.route('/').get(async (req, res, next) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
});

// Add New Employee
employeeRoute.route('/addEmployee').post(async (req, res, next) => {
    try {
        const newEmployee = new employeeModel(req.body);
        await newEmployee.save();
        res.status(201).json({ message: 'Employee Added Successfully' });
    } catch (error) {
        next(error);
    }
});

// Get Employee Details By Employee ID
employeeRoute.route('/editEmployee/:id').get(async (req, res, next) => {
    try {
        const employee = await employeeModel.findById(req.params.id);
        res.status(200).json(employee);
    } catch (error) {
        next(error);
    }
});

// Update Employee Details
employeeRoute.route('/updateEmployee/:id').post(async (req, res, next) => {
    try {
        const employee = await employeeModel.findById(req.params.id);
        if (!employee) {
            throw new Error('Unable To Find Employee With This Id');
        }

        // Update employee fields
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.email = req.body.email;
        employee.phone = req.body.phone;

        await employee.save();
        res.status(200).json({ message: 'Employee Updated Successfully' });
    } catch (error) {
        next(error);
    }
});

//delete employee
employeeRoute.route('/deleteEmployee/:id').get(async (req, res, next) => {
    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            throw new Error('Employee not found');
        }
        res.status(200).json({ message: 'Employee Deleted Successfully' });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
employeeRoute.use((err, req, res, next) => {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = employeeRoute;
