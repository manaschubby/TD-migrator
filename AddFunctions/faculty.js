let deptModel = require('../models/Dept');
let faculty = require('../models/Faculty');


async function addFaculty(req, res, next){
    const {
        psrn,
        name, 
        email, 
        dept,
        phone, 
        room, 
        desg 
    } = req.body;
    const probableFaculty = await faculty.find({psrn:psrn, name: name, email: email});
    if(probableFaculty.length != 0){
        return res.status(200).json(probableFaculty[0]);
    }
    const department = await deptModel.findOne({deptCode: dept})
    if(department!=null){
        const newFaculty = faculty({
            psrn:psrn,
            name:name,
            email:email,
            dept:department._id,
            phone:phone,
            room:room,
            desg:desg
        })
        newFaculty.save((err, createdFaculty)=>{
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: 'NOT able to save Faculty in DB'
                });
            }
            res.json(createdFaculty);
        })
    }else{
        return res.status(200).json({"error": "Not able to save"});
    }
    return;
}
module.exports = addFaculty;