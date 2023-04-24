const Account = require("../models/Account")
let deptModel = require('../models/Dept');

async function addAccounts(req, res, next) {
    const {
        dept,
        email,
        isAdmin
    } = req.body
    const newDept = [];
    for (const department of dept){
        const newDepartment = await deptModel.findOne({
            deptCode: department,
        })
        newDept.push(newDepartment._id);
    }
    let account;
    if(!isAdmin){
        account =  {
            dept: newDept,
            email: email,
            isAdmin: false
        };
    }else{
        account =  {
            dept: newDept,
            email: email,
            isAdmin: isAdmin
        };
    }
    const cl = Account(account);
    cl.save((err, newCl)=>{
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'NOT able to save room in DB'
            });
        }
        res.json(newCl);
    })
}

module.exports = addAccounts