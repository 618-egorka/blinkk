const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('пинг')
		.setDescription('[Отладка] проверка ответа'),
	async execute(interaction) {
		await interaction.reply(`> **Отладка** | ${client.ws.ping}мс – Понг`);
	},
};