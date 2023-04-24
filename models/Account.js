const mongoose = require('mongoose');

const instance = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	dept: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'dept'
		}
	]
});

const modelName = 'Account';

module.exports = mongoose.model(modelName, instance);
