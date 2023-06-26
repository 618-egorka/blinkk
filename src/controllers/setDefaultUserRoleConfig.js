module.exports = {
	setDefaultUserRoleConfig,
};

const model = require('../models/defaultUserRoleConfig.js');
const { getCashe } = require('../store/getCashe.js');

async function setDefaultUserRoleConfig({ roleId }) {

	const filter = { };

	const update = { roleId: roleId };

	const options = {
		upsert: true,
		new: true,
	};

	let success = null;
	let body = null;

	await model
		.findOneAndUpdate(filter, update, options)
		.then((response) => {
			getCashe(['defaultUserRoleConfigs']);
			success = true;
			body = response;
		})
		.catch(error => {
			body = error;
			success = false;
		});

	return {
		success: success,
		body: body,
	};
}