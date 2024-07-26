const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const upload = require('../utils/multerConfiguration.js');
const { adminAuthorization, authorization } = require('../middleware/authorization.js')

router.get('/', authorization, storeController.getStores)
router.post('/', adminAuthorization, upload.single('image'), storeController.addStore);
router.delete('/:id', adminAuthorization, storeController.deleteStore)
router.put('/:id', adminAuthorization, upload.single('image'), storeController.updateStore)

module.exports = router;
