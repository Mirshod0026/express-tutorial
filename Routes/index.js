const router = require('express').Router();

const AuthRoutes = require('../modules/auth/routes/index');
const UserRoutes = require('../modules/users/routes/index');

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);

module.exports = router;
