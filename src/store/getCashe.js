module.exports = {
	getCashe,
};

const logger = require('../utils/logger');

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const casheFolder = path.join(__dirname);

async function getCashe(collectionNames = ['adminNotifyConfigs', 'autoVoiceConfigs', 'defaultUserRoleConfigs']) {
	const collections = mongoose.connection.collections;
	const casheFilePath = path.join(casheFolder, 'cashe.json');
	let cashe = {};
	logger.debug(`[Util] Инициализация получения кэша`);

	try {
		// TODO Использовать для этого модуль readCashe
		if (!fs.existsSync(casheFilePath)) {
			logger.debug(`[Util] Файл кэша не найден`);
			writeCasheFile(casheFilePath, cashe);
		}
		const data = fs.readFileSync(casheFilePath);
		cashe = JSON.parse(data);
	}
	catch (error) {
		logger.error(`Ошибка чтения кэша по пути ${error}`);
	}

	collectionNames = collectionNamesToLoweCase(collectionNames);

	logger.debug(`[Util] Обработка данных кэша`);
	for (const key in collections) {
		if (!collections.hasOwnProperty(key)) continue;
		const collection = collections[key];

		if (!collectionNames || collectionNames.includes(collection.collectionName)) {
			const docs = await collection.find().toArray();
			cashe[collection.collectionName] = docs.length > 1 ? docs : docs[0];
		}
	}

	const writeStatus = await writeCasheFile(casheFilePath, cashe);

	return writeStatus;
}

async function writeCasheFile(casheFilePath, cashe) {

	let success = null;
	let body = null;

	try {
		fs.writeFileSync(casheFilePath, JSON.stringify(cashe, null, 2));
		success = true;
		logger.info(`Кэш успешно записан`);
	}
	catch (error) {
		success = false;
		body = error;
		logger.error(`Ошибка записи кэша ${error}`);
	}

	return {
		// данные возвращаются в middleware
		success: success,
		body: body,
	};
}

function collectionNamesToLoweCase(collectionNames) {
	const result = [];
	collectionNames.forEach(name => {
		result.push(name.toLowerCase());
	});
	return result;
}

