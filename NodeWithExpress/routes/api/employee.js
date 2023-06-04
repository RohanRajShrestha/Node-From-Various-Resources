const express = require('express');
const router = express.Router();
const path = require('path');

const ROLES_LIST = require('../../config/roles_list');
const {verifyRoles} = require('../../middleware/verifyRoles');

const employeeController = require('../../controllers/employeeController');
// instead of writing get post put and different
// we can use alternative as follows
console.log('roles list', ROLES_LIST);
router.route('/')
    .get(employeeController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports = router;