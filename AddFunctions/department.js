let deptModel = require('../models/Dept');
let faculty = require('../models/Faculty');

async function addDepartment(req, res, next) {
    const { HODName, HODPSRN, HODEmail, HODPhone, HODRoom, HODDesg, DeptCode, DeptName } = req.body
    const probableFaculty = await faculty.find({psrn:HODPSRN, name:HODName})
 
    if(probableFaculty.length != 0){
        const createdfaculty = probableFaculty[0]
        const department = deptModel({
            deptCode: DeptCode,
            name: DeptName,
            hod: createdfaculty._id
        })
        department.save(async (err, createdDepartment) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: 'NOT able to save department in DB'
                });
            }
            const newFaculty = await faculty.findByIdAndUpdate(createdfaculty._id,{
                $set:{
                    dept: createdDepartment._id
                }
            })
            res.json(createdDepartment);
        })
        return;
    }
    const HOD = faculty({
        psrn: HODPSRN,
        name: HODName,
        email: HODEmail,
        phone: HODPhone,
        room: HODRoom,
        desg: HODDesg,
        dept:null,
    })
    HOD.save((err, createdfaculty) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'NOT able to save faculty in DB'
            });
        }
        const department = deptModel({
            deptCode: DeptCode,
            name: DeptName,
            hod: createdfaculty._id
        })
        department.save(async (err, createdDepartment) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: 'NOT able to save faculty in DB'
                });
            }
            const newFaculty = await faculty.findByIdAndUpdate(createdfaculty._id,{
                $set:{
                    dept: createdDepartment._id
                }
            })
            console.log(newFaculty)
            res.json(createdDepartment);
    });
    }, (err)=>{
        console.log(err)
    })
   
}

module.exports =  addDepartment