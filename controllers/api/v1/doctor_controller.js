const Doctor = require('../../../models/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.create = async function(req,res){
    try {
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
        return;
    }
}

module.exports.login = async function(req,res){
    try {
        let doctor = await Doctor.findOne({username : req.body.username});
        if(doctor){
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
                        token : jwt.sign(doctor.toJSON(),'hospital_api',{expiresIn : 3600000})
                    }
                });
            }

        }

    } catch (error) {
        console.log('Error in doctor login',error);
        return;
    }
}