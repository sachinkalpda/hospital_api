const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

const db = mongoose.connection;


db.on('error',console.error.bind(console,'Error in Connectin Database'));


db.once('open',function(){
    console.log('Connected To Database');
});

module.exports = db;