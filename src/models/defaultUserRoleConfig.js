const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const model = new Schema({
	roleId: {
		type: String,
		default: 'null',
		required: true,
	},
}, { timestamps: true });


module.exports = mongoose.model('defaultUserRoleConfig', model);