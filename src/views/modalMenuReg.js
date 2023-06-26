module.exports = {
	modalMenuReg,
};

const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const logger = require('../utils/logger');

async function modalMenuReg(interaction) {
	logger.silly(`Инициализация вызова модального окна memberReg для ${interaction.user.username}} (${interaction.user.id}})`);
	// Create the modal
	const modal = new ModalBuilder()
		.setCustomId('modalMenuReg')
		.setTitle('Перед тем как играть..');

	const minecraftNameInput = new TextInputBuilder()
		.setCustomId('minecraftNameInput')
		.setLabel("Minecraft ник")
		.setPlaceholder("Ник для входа на сервер")
		.setStyle(TextInputStyle.Short)
		.setMaxLength(28)
		.setMinLength(3)
		.setRequired(true);

	const minecraftPasswordInput = new TextInputBuilder()
		.setCustomId('minecraftPasswordInput')
		.setLabel("Придумай пароль")
		.setPlaceholder("Его нужно вводить при входе на сервер")
		.setStyle(TextInputStyle.Short)
		.setMaxLength(32)
		.setMinLength(4)
		.setRequired(true);

	const descriptionInput = new TextInputBuilder()
		.setCustomId('descriptionInput')
		.setLabel("Планы на игру")
		.setStyle(TextInputStyle.Paragraph)
		.setMinLength(32)
		.setMaxLength(280)
		.setPlaceholder('Например, хочу строить, создавать ивенты или просто кайфовать в приятной компании)');

	const firstActionRow = new ActionRowBuilder().addComponents(minecraftNameInput);
	const secondActionRow = new ActionRowBuilder().addComponents(minecraftPasswordInput);
	const thirdActionRow = new ActionRowBuilder().addComponents(descriptionInput);

	modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

	await interaction.showModal(modal);
	logger.silly(`Вызвано модальное окно memberReg для ${interaction.user.username}} (${interaction.user.id}})`);
}