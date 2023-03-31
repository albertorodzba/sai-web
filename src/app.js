const express = require('express');
const path     = require('path');
const { engine }  = require('express-handlebars');
const morgan = require('morgan');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const methodOverride= require('method-override');
const flash =  require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const { PORT } = require('./config');
const multer =  require('multer');
const { v4: uuidv4 } = require('uuid');


//Initializations
const app = express();
require('./config/passport');



//Settings
app.set('port', PORT );

app.set('views', path.join( __dirname, 'views'));

app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutsDir : path.join( app.get('views'), 'layouts'),
    partialsDir: path.join( app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set("view engine",".hbs");


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'sproysai',
    resave: true,
    rolling:true,
    saveUninitialized: false,
    cookie:{
        maxAge: 300000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const storage = multer.diskStorage({
    destination: path.join(path.join( __dirname, 'public'), 'uploads'),
    filename: ( req, file, callbakk) => {
        callbakk( null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

app.use(multer( {storage}).single('image'));



//Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user  || null;
    next();
});

//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));
app.use(require("./routes/users.routes"));
app.use(require("./routes/items.routes"));
app.use(require("./routes/admin.routes"));


app.get('/session/destroy', ( req, res )=>{
    req.session.destroy();
});

// Static files
app.use(express.static(path.join( __dirname, 'public')));

//Route 404 not found
app.use(( req, res, next )=>{
    res.status(404).render('404');
});




module.exports = app;

