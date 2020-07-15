var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/abm-categorias', (req,res) =>
{
    return res.render('admin/crud_categories');
})

router.get('/crear-categoria', adminController.createCategory);

module.exports = router;
