const express = require("express");
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

router.route('/login')
    .post(AdminController.login);

router.route('/users')
    .get(AdminController.getUsers);

module.exports = router;