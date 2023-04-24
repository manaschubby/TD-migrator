const Preferences = require("../models/Preferences")

async function addPreferences(req, res, next) {
    const cl = Preferences(req.body);
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

module.exports = addPreferences