const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    reports : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Report',
        }
    ]
},{
    timestamps : true
});

const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = Doctor;