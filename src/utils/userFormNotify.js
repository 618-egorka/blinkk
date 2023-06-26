module.exports = {
	userFormNotify,
};

const { logger } = require('../utils/logger.js');
const { readCashe } = require('../store/readCashe.js');
const { getUserFormInfo } = require('../controllers/getUserFormInfo.js');
const { userFormOnboardMessage } = require('../views/userFormOnboardMessage.js');

async function userFormNotify(userId, interaction) {
	const cashe = readCashe();
	if (!cashe.success) return;
	const channel = interaction.client.channels.cache.get(cashe.body.adminnotifyconfigs.primaryChannelId);

	const checkResponse = await getUserFormInfo({ userDiscordId: userId });
	if (!checkResponse.success) {
		await channel.send({ content: `> Должна была быть получена заявка, но что-то пошло не так/n Попробуй выполнить команду получения заявок`, ephemeral: true });
		return;
	}
	if (checkResponse.success && checkResponse.body !== null) {
		const member = await interaction.guild.members.fetch(userId);
		const formData = checkResponse.body;
		await userFormOnboardMessage({ channel, member, formData });
	}
}