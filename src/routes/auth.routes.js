const express = require('express');

const router = express.Router();
const authContrller = require('../controller/auth.controller');

// Register Route
router.post('/register',authContrller.register)
router.post('/login',authContrller.login)

module.exports = router;