const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    gender : {
        type : String,
        enum : ['male','female'],
        required : true
    },
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctor',
        required : true,
    },
    reports : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Report',
        }
    ]

},{
    timestamps : true,
});

const Patient = mongoose.model('Patient',patientSchema);

module.exports = Patient;