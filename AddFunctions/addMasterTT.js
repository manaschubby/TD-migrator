const MasterTT = require("../models/MasterTT")

async function addMasterTT(req, res, next) {
    const cl = MasterTT(req.body);
    cl.save((err, newCl)=>{
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: 'NOT able to save Faculty in DB'
            });
        }
        res.json(newCl);
    })
}

module.exports = addMasterTT