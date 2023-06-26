require('dotenv').config();

const logger = require('./src/utils/logger');

const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { getCashe } = require('./src/store/getCashe.js');
// Получение разрешений (intents)
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.GuildMessages,
] });

const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.qm6kypp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

logger.info(`[App] Режим запуска ${process.env.RUN_MODE}`);
logger.info(`[App] Уровень логирования DEV: ${process.env.DEV_LOGGER_LEVEL} | PROD: ${process.env.PROD_LOGGER_LEVEL}`);
logger.info(`[App] Инициализация подключения к базе данных`);

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((response) => {
		logger.info(`[App] База данных подключена ${response.connection.host}`);
		getCashe();
	})
	.catch(error => logger.error(`[App] Ошибка подключения базы данных ${error}`));

// генерация команд
client.commands = new Collection();
commandGen();

function commandGen() {
	logger.debug(`[App] Инициализация команд`);
	const commandsPath = path.join(__dirname, './src/commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			logger.info(`[App] Обновлена команда ${command.data.name}`);
		}
		else {
			logger.warn(`[App] Команда в ${filePath} не содержит обязательного свойства data или execute`);
		}
	}
}

// генераця событий
const eventsPath = path.join(__dirname, './src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		logger.error(`[App] Не удалось найти команду ${interaction.commandName}`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		logger.error(`[-> App] При выполнении команды возникла ошибка ${error}`);
		await interaction.reply({ content: '> **Ошибка** | При выполнении команды возникла ошибка', ephemeral: true });
	}
});

client.login(process.env.TOKEN);


// //ивенты кнопок
// client.on(Events.InteractionCreate, interaction => {
// 	if (!interaction.isButton()) return;
// 	if(interaction.customId === 'buttonReg'){
// 		const modals = require('./src/views/modalMenuReg.js');
// 		modals.modalReg(interaction);
// 		return
// 	}
// });

// //ивенты модалов
// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isModalSubmit()) return;
// 	if(interaction.customId === 'modalReg'){
// 		const action = require('./src/views/memderReg.js');
// 		action.memberReg(
// 			interaction,
// 			client.users.fetch(interaction.user.id),
// 			client.channels.cache.get('972627985389736036')
// 			);
// 		return
// 	}
// });

// // //ивент AutoVoice
// // client.on(Events.VoiceServerUpdate, async interaction => {
// // 	console.log('VoiceStateUpdate');
// // });


// // client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
// // 	const autoVoice = require('./src/utils/autoVoice.js');
// // 	autoVoice.autoVoice(oldState, newState, client);
// // });