const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js')

router.post('/login', authController.login)
router.post('/initiallogin', authController.initialLogin)

module.exports = router;