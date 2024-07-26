const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const { authorization } = require('../middleware/authorization.js')

router.get('/', authorization, orderController.getOrders)
// router.get('/', authorization, orderController.getOrders)
router.post('/', authorization, authorization, orderController.addOrder);
router.post('/update-status', authorization, orderController.updateOrderStatus)
router.get('/:orderId', authorization, orderController.getOrderById)

// router.delete('/:id', orderController.deleteorder)
// router.put('/:id', upload.single('image'), orderController.updateorder)

module.exports = router;
