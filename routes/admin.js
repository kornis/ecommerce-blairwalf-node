var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');

//category routes
router.get('/categorias', adminController.indexCategory);
router.get('/categoria', adminController.createCategory);
router.post('/categoria', adminController.storeCategory);
router.put('/categoria/:id', adminController.updateCategory);
router.get('/categoria/:id', adminController.editCategory);
router.delete('/categoria/:id', adminController.deleteCategory);

//product routes

module.exports = router;
