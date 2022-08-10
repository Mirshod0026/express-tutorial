const router = require('express').Router();

const { AuthController } = require('../auth.controller');

router.route('/login').post((req, res) => AuthController.login(req, res));

module.exports = router;
