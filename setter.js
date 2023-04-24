const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const addDepartment = require("./AddFunctions/department");
const addCourse = require('./AddFunctions/course');
const addFaculty = require('./AddFunctions/faculty');
const addMasterTT = require('./AddFunctions/addMasterTT');
const addPreferences = require('./AddFunctions/preferences');
const addRooms = require('./AddFunctions/rooms');
const addAccounts = require('./AddFunctions/accounts');
async function main(){
    try{
        const db = await mongoose.connect("mongodb://localhost:27017/TD");
        const connection = db.connection

        connection.on('connected', () => console.log('✅ MongoDB connected')); // re-connected
        connection.on('disconnected', () => console.log('❌ MongoDB disconnected')); // disconnected
        connection.on('error', (error) => console.log('❌ MongoDB connection error', error)); // listen for errors during the session


        app.use(cors({}));
        app.use(express.json({ extended: true }));
        app.use(express.urlencoded({ extended: false }));


        app.post("/department", addDepartment);
        app.post("/course", addCourse);
        app.post("/faculty", addFaculty);
        app.post("/MasterTT", addMasterTT);
        app.post("/prefs", addPreferences);
        app.post("/rooms", addRooms);
        app.post("/accounts", addAccounts);
        app.get("/", (req,res) => res.status(200).json({message:"Hello World"}))
        app.listen(5000, () => {
            console.log(`✅ Server is listening on port: ${5000}`);
        });
    }catch (error) {
        console.log('❌ MongoDB connection error:', error.message);
    }
}   


main();