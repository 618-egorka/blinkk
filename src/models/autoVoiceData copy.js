const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const model = new Schema({
	temporaryChannelIds: {
		type: Array,
		default: [],
		required: true,
	},
}, { timestamps: true });


module.exports = mongoose.model('autoVoiceData', model);