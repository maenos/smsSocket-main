var express = require('express');
var router = express.Router();
const db = require('../database/db');
const { auth } = require('../controller/authRequest')


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session);

  let flashs = null;
  let auth = null;
  if (req.session.flash) {
    flashs = req.session.flash;
    req.session.flash = undefined;
  }
  if (req.session.uuid && req.session.auth) {
    setTimeout(() => {
      auth = req.session.auth;
    },1000)
  }


  res.render('index', { flash: flashs ? flashs : null, auth: false });
});


router.post('/auth', auth)





module.exports = router;
