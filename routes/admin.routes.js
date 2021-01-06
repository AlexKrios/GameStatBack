const express = require("express");
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

router.route('/login')
  .post(AdminController.login);

router.route('/user/:id')
  .get(AdminController.getUser)

router.route('/users')
  .get(AdminController.getUsers)

router.route('/user/create')
  .post(AdminController.createUser);

router.route('/user/update/:id')
  .put(AdminController.updateUser);

router.route('/user/delete/:id')
  .delete(AdminController.deleteUser);

module.exports = router;