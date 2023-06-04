const {v4:uuid} = require("uuid");

const data = {};
data.employees = require('../model/employee.json');
const {writeToFile} = require('../util/util');

const getAllEmployees = (req, res) =>{
    res.json(data.employees)
}

const createEmployee = (req, res) => {
    const newEmployee = {"id" : uuid(), "firstName" : req.body.firstName,"lastName" : req.body.lastName };

    if (!newEmployee.firstName || !newEmployee.lastName) {
        res.status(400).json({"id" : null, 'message' : "Data Not Found"});
    } else {
        data.employees.push(newEmployee);
        writeToFile('./model/employee.json', data.employees);
        res.json({"id" : newEmployee.id, 'message' : "User Created"});
    }
    
}

const updateEmployee = (req, res) => {
    console.log('here');
    const id = req.body.id;
    if (id) {
        const findIndex = data.employees.findIndex((emp) => emp.id == id);
        console.log(data.employees);
        data.employees[findIndex] = {
            "id" : id,
            "firstName" : req.body.firstName, 
            "lastName" : req.body.lastName 
        };
        writeToFile('./model/employee.json', data.employees);
        res.json({"id" : id, 'message' : "User Updated"});
    } else {
        res.json({"id" : req.params.id, "message" : "Failed To Update"}) 
    }
    
}

const deleteEmployee = (req, res) => {
    const id = req.body.id;
    if (id) {
        const findIndex = data.employees.findIndex((emp) => emp.id == id);
        data.employees.splice(findIndex, 1);
        writeToFile('./model/employee.json', data.employees)
        res.json({"id" : id, 'message' : "User Deleted"});
    } else {
        res.json({"id" : req.params.id, "message" : "Failed To Delete"}) 
    }
}

const getEmployee = (req, res) => {
    const id = req.params.id; // params if accessing data from url
    console.log(id);
    if (id) {
        const findById = data.employees.find((emp) => emp.id == id);
        console.log(findById);
        res.json(findById);
    } else {
        res.json({"id" : req.params.id, "message" : "Not Founnd"}) 
    }
}

module.exports = {
    getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee
}