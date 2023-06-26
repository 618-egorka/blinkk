module.exports = {
	setAutoVoiceConfig : setAutoVoiceConfig,
};

const model = require('../models/autoVoiceConfig');

async function setAutoVoiceConfig({ primaryChannelId, primaryCategoryId }) {
	const data = new model({
		primaryChannelId: primaryChannelId,
		primaryCategoryId: primaryCategoryId,
	});

	// фильтер пустой, чтобы получить все записи
	const filter = { };

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


	await data
		.findOneAndUpdate(filter, update, options)
		// .save()
		.then((response) => {
			success = true;
			body = response;
		})
		.catch(error => {
			body = error;
			success = false;
		});

	return {
		// данные возвращаются в middleware
		success: success,
		body: body,
	};
}