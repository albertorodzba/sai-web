const { Router } = require("express");
const router = Router();
const {
  renderSingupForm,
  singup,
  renderSinginForm,
  singin,
  logout,
} = require("../controllers/users.controller");

const { isAuthenticated } = require('../helpers/auth');

//SING UP
router.get("/users/singup", renderSingupForm);

router.post("/users/singup", singup);

//Sing in

router.get('/users/singin', renderSinginForm);

router.post('/users/singin', singin);

//Log out

router.get('/users/logout', isAuthenticated ,logout);


module.exports = router;
