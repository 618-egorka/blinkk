const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const model = new Schema({
	userMinecraftName: {
		type: String,
		required: true,
	},
	userMinecraftPassword: {
		type: String,
		required: true,
	},
	userDiscordId: {
		type: String,
		required: true,
	},
	formStatus: {
		type: String,
		required: true,
	},
	formDescription: {
		type: String,
		required: true,
	},
}, { timestamps: true });


module.exports = mongoose.model('userForm', model);