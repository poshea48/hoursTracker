const express = require('express')
const router = express.Router();
const hoursRoute = require('./hours');
const usersRoute = require('./users');

router.use('/users', usersRoute);
router.use('/hours', hoursRoute);

module.exports = router

//localhost:5000/api/users
