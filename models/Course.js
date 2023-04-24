var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var coursesSchema = new Schema({
	compCode: {
		type: Number,
		required: true,
		unique: true
	},
	courseCode: {
		type: String,
		required: true
	},
	deptCode: String,
	name: String,
	ic: {
		type: mongoose.ObjectId,
		ref: 'faculty'
	},
	sections: [
		{
			section: String,
			instructors: [
				{
					type: mongoose.ObjectId,
					ref: 'faculty'
				}
			]
		}
	],
	courseStrength: Number,
	totalUnits: Number,
	lectureUnits: Number,
	labUnits: Number,
	// Specfically for DELs: Determines if course is currenty offered
	active: Boolean,
	// Dels - D, CDC - C, HEL - H
	offeredAs: String,
	offeredBy: [
		{
			type: mongoose.ObjectId,
			ref: 'dept'
		}
	],
	// Options: HD, FD, PhD
	offeredTo: String,
	offeredToYear: Number,
	// 1 - Sem I, 2 - Sem II, 3 - Both
	offeredInSem: Number
});

var model = mongoose.model('course', coursesSchema);

module.exports = model;
