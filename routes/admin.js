var express = require('express');
var router = express.Router();

router.get('/abm-categorias', (req,res) =>
{
    return res.render('admin/abm-categorias');
})

module.exports = router;
