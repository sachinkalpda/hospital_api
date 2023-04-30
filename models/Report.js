const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    status : {
        type : String,
        enum : ['negative','travelled-quarantine','symptoms-quarantine','positive-admit'],
        required : true,
    },
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Doctor',
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref  : 'Patient',
    }

},{
    timestamps : true,
});

const Report = mongoose.model('Report',reportSchema);

module.exports = Report;