const Room = require("../models/Room")

async function addRooms(req, res, next) {
    const cl = Room(req.body);
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

module.exports = addRooms