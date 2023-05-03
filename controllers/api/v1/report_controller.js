const Report = require('../../../models/Report');

const { Validator } = require('node-input-validator');

// for showing the report filter by their status
module.exports.filterReports = async function(req,res){
    try {
        let v = new Validator(req.params,{
            status : 'required|in:all,negative,travelled-quarantine,symptoms-quarantine,positive-admit'
         });
         const matched = await v.check();
         if(!matched){
             return res.json(422,{
                 erorrs : v.errors,
                 status : false
             });
         }
        let status = req.params.status;
        let reports;
        if(status == 'all'){
            reports = await Report.find({}).populate('doctor','name -_id').populate('patient','-_id name phone gender').select('createdAt');
        }else{
            reports = await Report.find({status : status}).populate('doctor', 'name -_id').populate('patient','-_id name phone gender');
        }
        return res.json(200,{
            message : `${reports.length} Reports Found!`,
            reports : reports,
            status : true,
        });
        
    } catch (error) {
        console.log('Error in Filtering Report',error);
        return res.json(500,{
            message : "Internal Server Error",
            status : false,
        });
    }
}