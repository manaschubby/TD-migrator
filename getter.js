const mongoose = require("mongoose")
const Course = require("./models/Course");
const Department = require("./models/Dept");
const Faculty = require("./models/Faculty");
const Preferences = require("./models/Preferences");
const MasterTT = require("./models/MasterTT")
const Room = require("./models/Room")
const Account = require("./models/Account")
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
    
    await addDepartments();
    await addFaculties();
    await getCourses();
    await addMasterTT()
    await addPreferences()
    await addRooms()
    await addAccounts()
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

async function addMasterTT(){
    const masterTT = await MasterTT.find();
    for (const cl of masterTT){
        axios.post(`${urlEndpoint}/MasterTT`,{
            day: cl.day,
            hour: cl.hour,
            courseType: cl.courseType,
            classType: cl.classType
        })
    }
}

async function addPreferences(){
    const preferences = await Preferences.find();
    for (const cl of preferences){
        axios.post(`${urlEndpoint}/prefs`,{
            key: cl.key,
            value: cl.value
        }).then((response)=>{
            console.log(response.data);
        })
    }
}

async function addRooms() {
    const rooms = await Room.find();
    for (const room of rooms){
        axios.post(`${urlEndpoint}/rooms`,{
            block: room.block,
            roomNumber: room.roomNumber,
            classCapacity: room.classCapacity,
            examCapacity: room.examCapacity,
            roomType: room.roomType,
            departmentSpecification: room.departmentSpecification,
            impartus: room.impartus,
            mic: room.mic,
            speaker: room.speaker,
            projector: room.projector,
            smartBoard: room.smartBoard,
            smartMonitor: room.smartMonitor,
            biometric: room.biometric
        }).then((response)=>{
            console.log(response.data)
        })
    }
}
async function addAccounts(){
    const accunts = await Account.find()
    for (const account of accunts){
        const newdept = [];
        for (const department of account.dept){
            const dept = await Department.findById(department);
            newdept.push(dept.deptCode);
        }
        axios.post(`${urlEndpoint}/accounts`,{
            dept: newdept,
            email: account.email,
            isAdmin: account.isAdmin
        }).then((response)=>{console.log(response.data)})
    }
}

migrate();