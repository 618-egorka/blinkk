const logger = require('../utils/logger');
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		logger.info(`[Event] Бот запущен ${client.user.tag}`);
	},
};