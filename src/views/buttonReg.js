module.exports = {
	buttonReg,
};

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function buttonReg(channel) {
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('buttonReg')
				.setLabel('Начать играть')
				.setStyle(ButtonStyle.Primary)
				.setEmoji('👋'),
		);

	await channel.send({ content: 'Чел, ты должен', components: [row] });
}
