var express = require('express');
var router = express.Router();
var requireAuth = require('../middlewares/protectedRoute')
const db = require('../database/db');


let user = db.user;
/* GET users listing. */
router.get('/', requireAuth, async function (req, res, next) {
  let flashs = null;
  let auth = null;
  if (req.session.flash) {
    flashs = req.session.flash;
    req.session.flash = undefined;
  }
  if (req.session.uuid && req.session.auth) {

    auth = req.session.auth;

  }
  console.log(req.session.uuid )

  const User = await user.findOne({
    where: { uuid: req.session.uuid }
  });

  const users = await user.findAll();


  res.render('index', { user: User, users: users, flash: flashs ? flashs : null, auth: auth ? auth : null });
});


router.get('/logout', (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }

    return res.redirect('/');
  })
})


router.get('/:name', requireAuth, async (req, res) => {

  
  const me = await user.findOne({
    where: { uuid: req.session.uuid }
  });


  const User = await user.findOne({
    where: { username: req.params.name,  }
  });

  res.render('tchat',{user:User, me:me});
})



module.exports = router;
