const express = require('express')
const { adminAuthorization } = require('../middleware/authorization')
const dashboardController = require('../controllers/dashboardController.js')
const router = express.Router()


router.get('/dashboardcount', adminAuthorization, dashboardController.getDashboardCount)
router.get('/getStoreContribution', adminAuthorization, dashboardController.getStoreContribution)

module.exports = router