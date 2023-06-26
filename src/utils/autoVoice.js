module.exports.createTemporaryChannel = createTemporaryChannel;
module.exports.deleteTemporaryChannel = deleteTemporaryChannel;


const logger = require('../utils/logger');

const { addAutoVoiceData } = require('../controllers/addAutoVoiceData.js');
const { getAutoVoiceData } = require('../controllers/getAutoVoiceData.js');
const { remAutoVoiceData } = require('../controllers/remAutoVoiceData.js');
const { readCashe } = require('../store/readCashe.js');


async function createTemporaryChannel(state) {
	const cashe = readCashe();
	if (!cashe.success) return;
	const { primaryChannelId, primaryCategoryId } = cashe.body.autovoiceconfigs;

	if (state.channel.id !== primaryChannelId) return;
	const channel = await state.guild.channels.create({
		type: 2,
		// voice type = 2
		// name: state.member.user.username,
		name: state.member.nickname,
		user_limit: 4,
		parent: primaryCategoryId,
	});
	logger.verbose(`[Util] Создан приватный голосовой канал ${channel.name} (${channel.id})`);
	await addAutoVoiceData({ temporaryChannelId: channel.id });
	await state.member.voice.setChannel(channel);
	logger.verbose(`[Util] ${state.member.user.name} (${state.member.user.id}) перемещён в голосовой канал ${channel.name} (${channel.id})`);
}

async function deleteTemporaryChannel(state) {
	const channel = state.channel;

	if (channel.members.size !== 0) {
		return;
	}
	const response = await getAutoVoiceData(state.channel.id);
	if (!response.success) {
		logger.error(`[Util] Ошибка запроса ${response.body}`);
		return;
	}
	if (response.body === null) {
		return;
	}
	await remAutoVoiceData({ temporaryChannelId: response.body.temporaryChannelId });
	await channel.delete();
	logger.verbose(`[Util] Удалён приватный голосовой канал ${channel.name} (${channel.id})`);
}