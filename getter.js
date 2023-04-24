const mongoose = require("mongoose")
const Course = require("./models/Course");
const Department = require("./models/Dept");
const Faculty = require("./models/Faculty");
const { default: axios } = require("axios");

const urlEndpoint = "http://localhost:5000"

require('dotenv').config();

async function migrate(){
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        const connection = db.connection

        connection.on('connected', () => console.log('✅ MongoDB connected')); // re-connected
        connection.on('disconnected', () => console.log('❌ MongoDB disconnected')); // disconnected
        connection.on('error', (error) => console.log('❌ MongoDB connection error', error)); // listen for errors during the session
    }
    catch (error) {
        console.log('❌ MongoDB connection error:', error.message);
    }
    
    // await addDepartments();
    // await addFaculties();
    await getCourses();
    
}

async function addDepartments() {
    try {
        const depts = await Department.find();
        console.log(depts)
        depts.forEach(async (dept) => {
            const hod = await Faculty.findById(dept.hod);
            if(hod!=null){
                axios.post(`${urlEndpoint}/department`, { 
                    HODName: hod.name, 
                    HODPSRN: hod.psrn, 
                    HODEmail: hod.email, 
                    HODPhone: hod.phone, 
                    HODRoom: hod.room, 
                    HODDesg: hod.desg, 
                    DeptCode: dept.deptCode, 
                    DeptName: dept.name 
                }).then((newdept)=>{
                    console.log(newdept)
                })   
            }
        });
    }
    catch(err){
        console.log(err)
    }
}


async function addFaculties(){
    try {
        const faculties = await Faculty.find();
        faculties.forEach(async (faculty)=>{
            const department = await Department.findById(faculty.dept);
            if (department!=null){
                axios.post(`${urlEndpoint}/faculty`,{
                    psrn: faculty.psrn,
                    name: faculty.name,
                    email: faculty.email,
                    dept: department.deptCode,
                    phone: faculty.phone,
                    room: faculty.room,
                    desg: faculty.desg,
                })
            }
        })
    }catch (err){
        console.log(err);
    }
}

async function getCourses() {
    try {
        const courses = await Course.find();
        for (const course of courses) {
            const {
                compCode,
                courseCode,
                deptCode,
                name,
                courseStrength,
                totalUnits,
                lectureUnits,
                labUnits,
                sections,
                active,
                offeredAs,
                offeredBy,
                offeredTo,
                offeredToYear,
                offeredInSem, 
                ic
            } = course;
            const newOfferedBy = []
            for (const dept of offeredBy){
                const department = await Department.findById(dept);
                if(department!=null){
                    newOfferedBy.push(department.deptCode);
                }
            }
            const newSections = []
            sections.forEach(async (section)=>{
                const newInstructors = [];
                section.instructors.forEach(async (instructor)=>{
                    const newInstructor = await Faculty.findById(instructor);
                    newInstructors.push(newInstructor.psrn);
                });
                
                newSections.push({
                    instructors: newInstructors,
                    section: section.section
                });
            })
            let newIC
            if (ic){
                newIC = await Faculty.findById(ic);
            }
            axios.post(`${urlEndpoint}/course`,{
                compCode: compCode,
                courseCode: courseCode,
                deptCode: deptCode,
                name: name,
                courseStrength: courseStrength,
                totalUnits: totalUnits,
                lectureUnits: lectureUnits,
                labUnits: labUnits,
                sections: newSections,
                active: active,
                offeredAs: offeredAs,
                offeredBy: newOfferedBy,
                offeredTo: offeredTo,
                offeredToYear: offeredToYear,
                offeredInSem: offeredInSem, 
                ic: newIC
            }).then((response)=> {
                console.log(response);
            })
        }
    }
    catch (err){
        console.log(err);
    }
}

migrate();