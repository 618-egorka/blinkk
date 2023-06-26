module.exports = {
	readCashe,
};

const logger = require("../utils/logger");

const fs = require("fs");
const path = require("path");
const casheFolder = path.join(__dirname);

function readCashe() {
	logger.debug(`[Util] Инициализация чтения кэша`);
	try {
		const casheFilePath = path.join(casheFolder, "cashe.json");
		const data = fs.readFileSync(casheFilePath);
		logger.debug(`[Util] Кэш успешно прочитан`);
		return {
			success: true,
			body: JSON.parse(data),
		};
	}
	catch (error) {
		if (error.code === "ENOENT") {
			logger.error(`Ошибка чтения файла кэша ${error}`);
			return {
				success: false,
				body: error,
			};
		}
		throw error;
	}
}

/*

module.exports = {
	readCashe,
};

const logger = require("../utils/logger");

const fs = require("fs");
const path = require("path");
const { getCashe } = require("./getCashe");
const casheFolder = path.join(__dirname);

async function readCashe() {
	logger.debug(`[Util] Инициализация чтения кэша`);

	const response = await readFile();
	if (response.success) {
		logger.debug(`[Util] Кэш успешно прочитан`);
		return response;
	}
	if (response.success === false && response.body.code === "ENOENT") {
		logger.debug(`[Util] Файл кэша не найден`);
		await getCashe();
		return await readCashe();
	}
	logger.error(`Ошибка чтения файла кэша ${response.body}`);
	return response;
}

async function readFile() {
	try {
		const casheFilePath = path.join(casheFolder, 'cashe.json');
		const data = fs.readFileSync(casheFilePath);
		return {
			success: true,
			body: JSON.parse(data),
		};
	}
	catch (error) {
		return {
			success: false,
			body: error,
		};
	}
}

*/
