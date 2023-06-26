const logger = require('../utils/logger');
const { Events } = require('discord.js');

const { memberRegInitModal } = require('../middleware/memberRegInitModal.js');
const { memberRegSendModalData } = require('../middleware/memberRegSendModalData.js');
const { userFormAccept } = require('../utils/userFormAccept.js');
// const { memberReg } = require('../utils/MemberReg.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	execute(interaction) {
		if (interaction.isButton()) {
			logger.silly(`[Event] ${interaction.member.user.name} (${interaction.member.user.id}) нажал на кнопку ${interaction.customId} (${interaction.id})`);
			buttonClick(interaction);
		}
		if (interaction.isModalSubmit()) {
			logger.silly(`[Event] ${interaction.member.user.name} (${interaction.member.user.id}) отправил данные в модальном окне ${interaction.customId} (${interaction.id})`);
			modalSubmit(interaction);
		}
	},
};

async function buttonClick(interaction) {
	if (interaction.customId === 'buttonReg') await memberRegInitModal(interaction, interaction.member, interaction.channel);
	// if (interaction.customId === 'buttonUserFormAccept') await userFormAccept(interaction, interaction.member.use, interaction.channel);
}

async function modalSubmit(interaction) {
	if (interaction.customId === 'modalMenuReg') await memberRegSendModalData(interaction, interaction.member, interaction.channel);
}

