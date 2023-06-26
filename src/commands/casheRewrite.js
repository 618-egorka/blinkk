const { SlashCommandBuilder } = require('discord.js');
const { getCashe } = require('../store/getCashe.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('перезапись-кэша')
		.setDescription('[Отладка] перезапись локального кэша базы данных')
		.setDefaultMemberPermissions(0),

	async execute(interaction) {
		const response = await getCashe();
		if (response.success) {
			interaction.reply({ content: `> **Отладка** | Кэш перезаписан`, ephemeral: true });
		}
		if (!response.success) {interaction.reply({ content: `> **Отладка** | Ошибка перезаписи кэшка`, ephemeral: true });}
		else {
			interaction.reply({ content: `> **Отладка** | Неизвестная ошибка`, ephemeral: true });
		}
	},
};
