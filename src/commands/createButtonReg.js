const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { buttonReg } = require('../views/buttonReg.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('создать-кнопку-регистрации')
		.setDescription('[Отладка] создаёт кнопку регистрации')
		.setDefaultMemberPermissions(0)

		.addChannelOption(optionChannel =>
			optionChannel.setName('канал')
				.setDescription('Канал, где будет создана кнопка')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText)),

	async execute(interaction) {
		const channel = interaction.options.getChannel('канал');
		buttonReg(channel);
		interaction.reply({ content: '> **Отладка** | Кнопка успешно добавлена', ephemeral: true });
	},
};

