var express = require('express');
var cors = require('cors');
var router = express.Router();

const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('main/index');
});

router.get('/carrito', function(req,res)
{
  return res.render('main/')
})




/* LOGIN and REGISTER */

router.get('/login',mainController.login);
router.post('/login', mainController.loginPost);
router.get('/registrarse', mainController.createUser);
router.put('/registrarse', mainController.saveUser);

router.post('/login-with-google',cors(),mainController.googleLogin);






module.exports = router;