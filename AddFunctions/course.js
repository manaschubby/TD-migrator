const Course = require("../models/Course")


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
        offeredinSem, 
        sections, 
        ic 
    } = req.body;
    console.log(req.body);
}
module.exports = addCourse;