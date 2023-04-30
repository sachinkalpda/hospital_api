const Doctor = require('../../../models/Doctor');
const Patient = require('../../../models/Patient');
const Report = require('../../../models/Report');

const { Validator } = require('node-input-validator');



// for registering a new patient by a authorize doctor
module.exports.register = async function(req,res){
    try {
        let v = new Validator(req.body,{
            name : 'required',
            phone : 'required',
            age : 'required',
            gender : 'required|in:male,female'
        });
        const matched = await v.check();
        if(!matched){
            return res.json(422,{
                erorrs : v.errors,
                status : false
            });
        }
        let patientExist = await Patient.findOne({phone : req.body.phone});
        if(patientExist){
            return res.json(200,{
                message : 'Patient Already Exist',
                status : true,
                patient : patientExist,
            });
        }
        let patient = await Patient.create({
            name : req.body.name,
            phone : req.body.phone,
            age : req.body.age,
            gender : req.body.gender,
            doctor : req.user._id,
        });
        if(patient){
            return res.json(200,{
                message : 'Patient Registered Successfully',
                status : true,
            })
        }
        return res.json(500,{
            message : 'Internal Server Error',
            status : false,
        });
        
    } catch (error) {
        console.log('Error in Patient Registration',error);
        return res.json(500,{
            message : 'Internal Server Error',
            status : false
        });
    }
}

// for creating a report for patient by a  authorize doctor
module.exports.createReport = async function(req,res){
    try {
        let v = new Validator(req.body,{
           status : 'required|in:negative,travelled-quarantine,symptoms-quarantine,positive-admit'
        });
        const matched = await v.check();
        if(!matched){
            return res.json(422,{
                erorrs : v.errors,
                status : false
            });
        }
        let patient  = await Patient.findById(req.params.id);
        if(patient){
            let report = await Report.create({
                status : req.body.status,
                doctor : req.user.id,
                patient : patient._id,
            });
            if(report){
                let doctor = await Doctor.findById(req.user.id);
                patient.reports.push(report._id);
                await patient.save();
                doctor.reports.push(report._id);
                await doctor.save();
                return res.json(200,{
                    message : `Report Generated for ${patient.name}`,
                    status : true,
                });
            }
            return res.json(500,{
                message : 'Internal Server Error',
                status : false,
            });
        }
        return res.json(422,{
            message : 'Invalid Patient',
            status : false,
        });
        
    } catch (error) {
        console.log('Error in Creating report',error);
        return res.json(500,{
            message : 'Internal Server Error',
            status : false
        });
    }
}

// to show all reports of a particular patient by its id
module.exports.allReports = async function(req,res){
    try {
        let patient = await Patient.findById(req.params.id);
        if(patient){
            let reports = await Report.find({patient : req.params.id}).populate('doctor','name -_id').populate('patient','-_id name phone gender').select('createdAt').sort({createdAt : 1});
            return res.json(200,{
                message : `${patient.reports.length} Reports Found!`,
                reports : reports
            });
        }
        return res.json(422,{
            message : 'Invalid Patient!',
            status : false,
        });
        
    } catch (error) {
        console.log('Error in All Reports',error);
        return res.json(500,{
            message : 'Internal Server Error',
            status : false
        });
    }
}

// to show all patients information 
module.exports.allPatients = async function(req,res){
    try {
        let patients = await Patient.find().select('name phone gender createdAt').sort({name : 1});
        return res.json(200,{
            message : `Total ${patients.length} Found!`,
            patients : patients,
            status : true,
        })
    } catch (error) {
        console.log('Error in showing all patient',error);
        return res.json(500,{
            message : 'Internal Server Error',
            status : false
        });
    }
}