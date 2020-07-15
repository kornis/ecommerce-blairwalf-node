var express = require('express');
var cors = require('cors');
var router = express.Router();
const guest = require('../middlewares/guestMiddleware');
const validator = require('../middlewares/form_validators');
const mainController = require('../controllers/mainController');



/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('main/index');
});

router.get('/carrito', function(req,res)
{
  return res.render('main/')
})

router.get('/perfil', (req,res) => {
  res.render('users/profile');
})


/* LOGIN and REGISTER */

router.get('/login',guest,mainController.login);
router.post('/login',guest, mainController.authenticate);
router.get('/registrarse',guest, mainController.createUser);
router.put('/registrarse',guest, validator.check_register, mainController.saveUser);
router.get('/logout', mainController.logout);

module.exports = router;