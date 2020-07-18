var express = require('express');
var router = express.Router();
const sideBarData = require('../middlewares/adminSideBar');
const adminController = require('../controllers/adminController');
//dashboard
router.get('/admin/dashboard', (req, res) => {
    return res.render('admin/dashboard');
});

//category routes
router.get('/categorias', sideBarData, adminController.indexCategory);
router.get('/categoria', sideBarData, adminController.createCategory);
router.post('/categoria', adminController.storeCategory);
router.put('/categoria/:id', adminController.updateCategory);
router.get('/categoria/:id', sideBarData, adminController.editCategory);
router.delete('/categoria/:id', adminController.deleteCategory);

//brand-routes
router.get('/marcas', sideBarData, adminController.indexBrand);
router.get('/marca', sideBarData, adminController.createBrand);
router.post('/marca', adminController.storeBrand);
router.put('/marca/:id', adminController.updateBrand);
router.get('/marca/:id', sideBarData, adminController.editBrand);
router.delete('/marca/:id', adminController.deleteBrand);

//provider-routes
router.get('/proveedores', sideBarData, adminController.indexProvider);
router.get('/proveedor', sideBarData, adminController.createProvider);
router.post('/proveedor', adminController.storeProvider);
router.put('/proveedor/:id', adminController.updateProvider);
router.get('/proveedor/:id', sideBarData, adminController.editProvider);
router.delete('/proveedor/:id', adminController.deleteProvider);

//sizes-routes
router.get('/talles', sideBarData, adminController.indexSize);
router.get('/talle', sideBarData, adminController.createSize);
router.post('/talle', adminController.storeSize);
router.put('/talle/:id', adminController.updateSize);
router.get('/talle/:id', sideBarData, adminController.editSize);
router.delete('/talle/:id', adminController.deleteSize);

//products-routes
router.get('/productos', sideBarData, adminController.indexProduct);
router.get('/producto', sideBarData, adminController.createProduct);
router.post('/producto', adminController.storeProduct);
router.put('/producto/:id', adminController.updateProduct);
router.get('/producto/:id', sideBarData, adminController.editProduct);
router.delete('/producto/:id', adminController.deleteProduct);
module.exports = router;
