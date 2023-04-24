const mongoose = require("mongoose")
const Course = require("./models/Course");
const Department = require("./models/Dept");
const Faculty = require("./models/Faculty");
const { default: axios } = require("axios");
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
    const hod = await Faculty.findById("63d22c7c20f5ed0616715c0b")
    console.log(hod);

    // await addDepartments();
    // await addFaculties();
    // await getCourses();
    const courses = await Course.find();
    courses.forEach((course)=>{
        console.log(course.sections)
    })
}

async function addDepartments() {
    try {
        const depts = await Department.find();
        console.log(depts)
        depts.forEach(async (dept) => {
            const hod = await Faculty.findById(dept.hod);
            if(hod!=null){
                axios.post("http://localhost:5000/department", { 
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
                axios.post("http://localhost:5000/faculty",{
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
            const {id,
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
                offeredInSem} = course;
                const newOfferedBy = []
                for (const dept of offeredBy){
                    const department = await Department.findById(dept);
                    if(department!=null){
                        newOfferedBy.push(department.deptCode);
                    }
                   
                }
                for (const section in sections){
                    
                }
        }
    }
    catch (err){
        console.log(err);
    }
}

migrate();