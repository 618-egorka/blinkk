const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('хост-инфо')
		.setDescription('[Отладка] вывод имени хоста'),
	async execute(interaction) {
		await interaction.reply(`> **Отладка** | Имя хоста ${require("os").hostname()}`);
	},
};