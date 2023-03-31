const usersCtrl = {};
const passport = require('passport');
const User = require('../models/User');


usersCtrl.renderSingupForm = (req, res) => {
  res.render("users/singup");
};

usersCtrl.singup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if ( password !== confirm_password ) 
  {
      errors.push({text:'Password do not match'});
  }

  if ( password.length < 8 ) 
  {
    errors.push({text:'Password must be at least 8 characters'});
  }

  if( errors.length > 0)
  {
      res.render('users/singup', 
      {errors,
        name,
        email
    })
     
  }else 
  {
    const emailUser = await User.findOne( {email} );
    if( emailUser )
    {
        req.flash('error_msg', 'The email already is in use');
        res.redirect('/users/singup');
    }else 
    {
        const newUser = new User( {name, email, password} );
        newUser.password = await newUser.encryptPass(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered ');
        res.redirect('/users/singin');
    }
  } 
};

usersCtrl.renderSinginForm = (req, res) => {
  res.render("users/singin");
};

usersCtrl.singin = passport.authenticate('local', {
  failureRedirect: '/users/singin',
  successRedirect: '/notes',
  failureFlash: true

});

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', " You're logged out");
  res.redirect('/users/singin');
};


module.exports = usersCtrl;
