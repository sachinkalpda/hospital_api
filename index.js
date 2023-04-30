
const express = require('express');

const app = express();
const port = 8000;

require('dotenv').config();

const MongoStore = require('connect-mongo');

// passport authentication library
const passport = require('passport');
// passport jwt strategy
const passportJWT = require('./config/passport_jwt_strategy');

// database connection
const db = require('./config/mongoose');

app.use(express.urlencoded({
    extended : true
}));
// for session 

const session = require('express-session');

// use session
app.use(session({
    name : 'hospital api',
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // secure: true ,
        maxAge : (1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl : db._connectionString,
        autoRemove : 'disabled',
    },function(err){
        console.log(err);
    })
}));

// intitializeing the passport strategy
app.use(passport.initialize());

// express routes
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('Erorr in Starting Server',err);
        return;
    }
    console.log('Server is running on port : ',port);
});



