module.exports = {
	setAutoVoiceConfig: setAutoVoiceConfig,
};

const model = require("../models/autoVoiceConfig");
const { getCashe } = require("../store/getCashe.js");

async function setAutoVoiceConfig({ primaryChannelId, primaryCategoryId }) {
	const filter = {};
	// фильтер пустой, чтобы получить все записи

	const update = {
		primaryChannelId: primaryChannelId,
		primaryCategoryId: primaryCategoryId,
	};

	const options = {
		upsert: true,
		// если запись не найдена, создать новую
		new: true,
		// вернуть обновленную запись
	};

	let success = null;
	let body = null;

	await model
	// не data, т.к. мы изменяем существующую запись
		.findOneAndUpdate(filter, update, options)
	// .save()
		.then((response) => {
			getCashe(['AutoVoiceConfigs']);
			success = true;
			body = response;
		})
		.catch((error) => {
			body = error;
			success = false;
		});

	return {
		// данные возвращаются в middleware
		success: success,
		body: body,
	};
}
