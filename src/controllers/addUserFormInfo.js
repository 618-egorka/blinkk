module.exports = {
	addUserFormInfo,
};

const logger = require('../utils/logger');
const model = require('../models/userFormInfo.js');

async function addUserFormInfo({ userMinecraftName, userMinecraftPassword, userDiscordId, formStatus, formDescription }) {
	logger.debug(`[Controller] Инициализация добавления записи в userFormInfo`);

	const data = new model({
		actualModsLook: {
			configVersion: '1',
			modsPackage: {
				packageVersion: '1.0.0',
				modsCoreVerison: 'Fabric 1.19.2',
			},
			mods: [
				{
					name: 'label1',
					description: 'description1',
					fileName: 'EMP_file1--1-0-0.jar',
					originalFileName: 'file1-1.19.2-fabric.jar',
					modPageLink: 'https://modrinth.com/mod/file1',
					downloadLink: 'https://cdn.modrinth.com/data/P7dR8mSH/versions/qvrUMd9Z/fabric-api-0.79.0%2B1.19.4.jar',
				},
				{
					name: 'label2',
					description: 'description2',
					fileName: 'EMP_file2--1-0-0.jar',
					originalFileName: 'file2-1.19.2-fabric.jar',
					modPageLink: 'https://modrinth.com/mod/file2',
					downloadLink: 'https://cdn.modrinth.com/data/uPWCQrVL/versions/yV1SwVzK/extrasounds-2.3.1%2B1.19.2-1.19.1.jar',
				},
				{
					name: 'label3',
					description: 'description2',
					fileName: 'EMP_file5--1-0-2.jar',
					originalFileName: 'file2-1.19.2-fabric.jar',
					modPageLink: 'https://modrinth.com/mod/file2',
					downloadLink: 'https://cdn.modrinth.com/data/fM515JnW/versions/S9iWVbEo/AmbientSounds_FORGE_v5.2.18_mc1.19.4.jar',
				},
			],
		},
	});

	let success = null;
	let body = null;

	await data
		.save()
		.then((response) => {
			success = true;
			body = response;
			logger.debug(`[Controller] Запись успешно добавлена в userFormInfo`);
		})
		.catch(error => {
			body = error;
			success = false;
			logger.debug(`[Controller] Опшибка при добавлении записи в userFormInfo ${error}`);
		});

	return {
		success: success,
		body: body,
	};
}