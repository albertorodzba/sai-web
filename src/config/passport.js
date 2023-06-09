const passport      = require('passport');
const localStrategy =  require('passport-local');

//require DBs
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},  async (email, password, done) =>{

    //Match Email's user
    const user = await User.findOne({email});
    if(!user) 
    {
        return done (null, false, { message: 'Not user found' });
    }
    else
    {
        //Match Password's user
        const matchPass = await user.matchPassword(password);

        if( matchPass ) 
        {
            return done(null, user);
        }else
        {
            return done( null, false, { message : 'Incorrect username or password.'});
        }
    }

}
));

passport.serializeUser( ( user, done ) => {
    done(null, user.id);

});

passport.deserializeUser( ( id, done)=> {
    User.findById(id, ( err, user) => {
        done(err, user);
    });

});