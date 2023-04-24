var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deptSchema = new Schema({
	deptCode: {
		type: String,
		unique: true,
		required: true
	},
	name: String,
	hod: {
		type: mongoose.ObjectId,
		ref: 'faculty',
		required: true
	}
});

var model = mongoose.model('dept', deptSchema);

module.exports = model;
