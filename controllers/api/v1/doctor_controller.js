const Doctor = require('../../../models/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Validator } = require('node-input-validator');



// to register a new doctor
module.exports.create = async function(req,res){
    try {
        let v = new Validator(req.body,{
            name : 'required',
            email : 'required',
            username : 'required',
            password : 'required',
        });
        const matched = await v.check();
        if(!matched){
            return res.json(422,{
                erorrs : v.errors,
                status : false
            });
        }
        let doctor = await Doctor.create({
            name : req.body.name,
            email : req.body.email,
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password,10),
        });
        if(doctor){
            return res.json(200,{
                message : 'Docter Created!',
                status : true
            });
        }
        return res.json(422,{
            message : 'Somthing Went Wrong',
            status : false
        });
        
    } catch (error) {
        console.log('Error in creating doctor',error);
        return res.json(500,{
            message : 'Internal Server Error',
            status : false
        });
    }
}


// for login the existing doctor
module.exports.login = async function(req,res){
    try {
        let v = new Validator(req.body,{
            username : 'required',
            password : 'required'
        });
        const matched = await v.check();
        if(!matched){
            return res.json(422,{
                erorrs : v.errors,
                status : false
            });
        }
        let doctor = await Doctor.findOne({username : req.body.username});
        if(!doctor || !bcrypt.compareSync(req.body.password,doctor.password) ){
            return res.json(422,{
                message : "Invalid Username/Password",
                status : false,
            });
        }else{  
           return res.json(200, {
                message : "Logged IN",
                status : true,
                data : {
                    token : jwt.sign(doctor.toJSON(),process.env.SECRET_KEY,{expiresIn : '30m'})
                }
            });
        }

    } catch (error) {
        console.log('Error in doctor login',error);
        return res.json(500,{
            message : 'Internal Server Error',
            status : false
        });
    }
}