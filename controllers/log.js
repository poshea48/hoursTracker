// Import User model
const express = require('express');
const router = express.Router()
const Log = require('../models/Log');

router.get('/', (req, res) => {
  res.json({msg: "LOGS"})
})

module.exports = router;
