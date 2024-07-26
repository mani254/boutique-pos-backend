const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController.js');
const { authorization } = require('../middleware/authorization.js')

console.log(customerController.getCustomers)

router.get('/', authorization, customerController.getCustomers);



module.exports = router;
