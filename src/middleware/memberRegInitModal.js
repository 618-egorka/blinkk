module.exports = {
	memberRegInitModal,
};

const logger = require('../utils/logger');
const { getUserFormInfo } = require('../controllers/getUserFormInfo.js');
const { modalMenuReg } = require('../views/modalMenuReg.js');

async function memberRegInitModal(interaction, member) {

	const checkResponse = await getUserFormInfo({ userDiscordId: member.user.id });

	if (!checkResponse.success) {
		await interaction.reply({ content: `> Что-то пошло не так(\n Попробуй ещё раз`, ephemeral: true });
		return;
	}
	if (checkResponse.success && checkResponse.body !== null) {
		await interaction.reply({ content: `> Мм.. я уже видел твою заявку, подожди пока её рассмотрят`, ephemeral: true });
		return;
	}
	// TODO: Добавить вторую проверку на ник уже в таблице игроков. Типа проверка ника в заявках и в игроках

	await modalMenuReg(interaction);
}