var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
	block: String,
	roomNumber: String,
	classCapacity: Number,
	examCapacity: Number,
	roomType: String,
	departmentSpecification: String,
	impartus: Boolean,
	mic: Boolean,
	speaker: Boolean,
	projector: Boolean,
	smartBoard: Boolean,
	smartMonitor: Boolean,
	biometric: Boolean
});

var model = mongoose.model('room', roomSchema);

module.exports = model;
