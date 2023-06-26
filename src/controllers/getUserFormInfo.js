module.exports = {
	getUserFormInfo,
};

const logger = require('../utils/logger');
const model = require('../models/userFormInfo.js');

async function getUserFormInfo(filter) {
	logger.debug(`[Controller] Инициализация получения записей в userFormInfo`);

	let success = null;
	let body = null;
	logger.info(`FILTEEEEER ${JSON.stringify(filter)}`);
	try {
		let response;
		if (filter !== null) {
			response = await model.findOne(filter);
			logger.info(`FILTEEEEER FIND ONE ${JSON.stringify(filter)}`);
			logger.info(`RESPONSE FIND ONE ${JSON.stringify(response)}`);
			logger.debug(`[Controller] Инициализация получения конкретной записи в userFormInfo`);
		}
		else {
			response = await model.find();
		}
		success = true;
		body = response;
		logger.debug(`[Controller] Запись успешно получена в userFormInfo`);
	}
	catch (error) {
		body = error;
		success = false;
		logger.error(`[Controller] Ошибка получения записи в userFormInfo ${error}`);
	}
	logger.info(`ВЕРНУЛ РЕЗУЛЬТАТ ${JSON.stringify({ success: success, body: body })}`);
	return {
		success: success,
		body: body,
	};
}
