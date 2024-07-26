const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const { adminAuthorization } = require('../middleware/authorization.js');

router.get('/', adminAuthorization, adminController.getAdmins);
router.post('/', adminAuthorization, adminController.addAdmin);
router.put('/:adminId', adminAuthorization, adminController.updateAdmin)
router.delete('/:adminId', adminAuthorization, adminController.deleteAdmin)

module.exports = router;
