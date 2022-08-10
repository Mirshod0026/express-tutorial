const router = require('express').Router();
const { UserController } = require('../users.controller');

router
  .route('/')
  .post((req, res) => UserController.createUser(req, res))
  .get((req, res) => UserController.getUsers(req, res));

module.exports = router;
