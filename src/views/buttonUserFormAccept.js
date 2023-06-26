module.exports = {
	buttonUserFormAccept,
};

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function buttonUserFormAccept(channel) {
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('buttonUserFormAccept')
				.setLabel('Принять')
				.setStyle(ButtonStyle.Success))
		.addComponents(
			new ButtonBuilder()
				.setCustomId('buttonUserFormReject')
				.setLabel('Отклонить')
				.setStyle(ButtonStyle.Danger),
		);

	await channel.send({ content: 'Добавь пользователя в whitelist сервера перед принятием заявки', components: [row] });
}
