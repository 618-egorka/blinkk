module.exports = {
	buttonUserFormAccept,
};

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function buttonUserFormAccept(channel) {
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('buttonUserFormAccept')
				.setLabel('Отклонить')
				.setStyle(ButtonStyle.Success),
		);

	await channel.send({ content: '', components: [row] });
}
