const Course = require("../models/Course")
let deptModel = require('../models/Dept');
let faculty = require('../models/Faculty');

async function addCourse(req, res, next) {
    const { 
        compCode,
        courseCode, 
        deptCode, 
        name, 
        courseStrength, 
        totalUnits, 
        lectureUnits, 
        labUnits, 
        active, 
        offeredAs, 
        offeredBy, 
        offeredTo, 
        offeredInSem, 
        sections, 
        ic 
    } = req.body;
    const newSections = []
    for (const section of sections){
        const newInstructors = [];
        for (const instructor of section.instructors){
            const newInstructor = await faculty.find({
                psrn: instructor
            })
            newInstructors.push(newInstructor[0]._id);
        }
        newSections.push({
            section: section.section,
            instructors: newInstructors
        })
    }
    const newOfferedBy = []
    for (const dept of offeredBy){
        const newdept = await deptModel.findOne({
            deptCode: dept
        })
        newOfferedBy.push(newdept._id);
    }
    let newIc;
    if (ic){
        const IC = await faculty.findOne({
            psrn: ic.psrn,
        })
        newIc = IC._id;
    }
    const course = Course({
        compCode: compCode,
        courseCode: courseCode, 
        deptCode: deptCode, 
        name: name, 
        courseStrength: courseStrength, 
        totalUnits: totalUnits, 
        lectureUnits: lectureUnits, 
        labUnits:labUnits, 
        active: active, 
        offeredAs: offeredAs, 
        offeredBy: newOfferedBy, 
        offeredTo: offeredTo, 
        offeredInSem: offeredInSem, 
        sections: newSections, 
        ic: newIc 
    })
    course.save((err, newCourse) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'NOT able to save Faculty in DB'
            });
        }
        res.json(newCourse);
    })
}
module.exports = addCourse;