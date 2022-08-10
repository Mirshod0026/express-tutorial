const router = require('express').Router();

const UserRoutes = require('../modules/users/routes/index');

router.use('/users', UserRoutes);

module.exports = router;
