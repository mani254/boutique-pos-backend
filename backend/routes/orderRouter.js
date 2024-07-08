const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const authorization = require('../middleware/authorization.jsx')

router.get('/', authorization, orderController.getOrders)
router.post('/', authorization, orderController.addOrder);
// router.delete('/:id', orderController.deleteorder)
// router.put('/:id', upload.single('image'), orderController.updateorder)

module.exports = router;
