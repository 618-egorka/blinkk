const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const model = new Schema({
	primaryChannelId: {
		type: String,
		default: 'null',
		required: true,
	},
}, { timestamps: true });


module.exports = mongoose.model('adminNotifyConfig', model);