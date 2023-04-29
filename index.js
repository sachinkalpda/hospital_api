
const express = require('express');

const app = express();
const port = 8000;
require('dotenv').config();


const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy');

const db = require('./config/mongoose');

app.use(express.urlencoded({
    extended : true
}));


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



