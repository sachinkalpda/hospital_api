const mongoose = require('mongoose');

// mongoose connection
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

// on error 
db.on('error',console.error.bind(console,'Error in Connectin Database'));

// on success
db.once('open',function(){
    console.log('Connected To Database');
});

module.exports = db;