const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');



router.get('/', adminController.getAdmins);
router.post('/', adminController.addAdmin);
router.put('/:adminId', adminController.updateAdmin)
router.delete('/:adminId', adminController.deleteAdmin)

module.exports = router;
