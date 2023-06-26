/*

Регистировать команды в боте можно определённое кол-во раз в день,
чтобы не делать это при каждом перезапуске, создан модулшь deploy-commands, регистрирующий их при необходимости.
Запуск производится через отдельный sh файл

*/

require('dotenv').config();
const logger = require('./src/utils/logger');

const { REST, Routes } = require('discord.js');
const clientId = process.env.CLIENT_ID;

const path = require('node:path');
const fs = require('node:fs');
const commands = [];

// Получение всех файлов команд из каталога commands
const commandsPath = path.join(__dirname, './src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Получение SlashCommandBuilder#toJSON() каждой команды для регистрации
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
}

// Создание и подготовка модуля REST
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Регистрация команд
(async () => {
	try {
		logger.info(`Начато обновление ${commands.length} (/) команд `);
		const data = await rest.put( // Метод put для полного обновления команд
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		logger.info(`Успешно обновлено ${data.length} (/) команд)`);

	} catch (error) { console.error(error); }
})();