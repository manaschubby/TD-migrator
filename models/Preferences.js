var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var preferencesSchema = new Schema({
	key: {
		type: String,
		unique: true,
		required: true
	},
	value: String
});

var model = mongoose.model('prefs', preferencesSchema);

module.exports = model;
