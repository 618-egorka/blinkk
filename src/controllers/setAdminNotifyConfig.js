module.exports = {
	setAdminNotifyConfig : setAdminNotifyConfig,
};

const model = require('../models/adminNotifyConfig.js');
const { getCashe } = require('../store/getCashe.js');

async function setAdminNotifyConfig({ primaryChannelId }) {

	const filter = { };

	const update = { primaryChannelId: primaryChannelId };

	const options = {
		upsert: true,
		new: true,
	};

	let success = null;
	let body = null;

	await model
		.findOneAndUpdate(filter, update, options)
		.then((response) => {
			getCashe(['adminNotifyConfigs']);
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