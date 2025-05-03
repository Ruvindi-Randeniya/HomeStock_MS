const express = require('express');
const router = express.Router();
const itemController = require('../../Controller/item-management/item-controller');

// ✅ Remove extra `/items`, already handled by `index.js`
router.post('/items', itemController.createItem);
router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItemById);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
