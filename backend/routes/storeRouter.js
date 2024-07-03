const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const upload = require('../utils/multerConfiguration.js');


router.get('/', storeController.getStores)
router.post('/', upload.single('image'), storeController.addStore);
router.delete('/:id', storeController.deleteStore)
router.put('/:id', upload.single('image'), storeController.updateStore)

module.exports = router;
