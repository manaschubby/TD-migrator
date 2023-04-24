var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var masterTTScheme = new Schema({
	day: {
		type: String,
		required: true,
	},
	hour: {
		type: String,
		required: true
	},
	courseType: {
		type: String,
		required: true
	},
	classType: {
		type: String,
		required: true
	}
});

var model = mongoose.model('masterTT', masterTTScheme);

module.exports = model;


//courseType
// A - Ist year CDC
// B - IInd year CDC
// C - IIIrd year CDC
// H - HEL Course
// D - DEL Course
// O - Optional Course


// classType
// L - Lecture 
// T - Tutorial
// P - Practical