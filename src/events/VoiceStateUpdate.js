const logger = require('../utils/logger');
const { Events } = require('discord.js');
// const { setAutoVoiceData } = require('../controllers/setAutoVoiceData.js');

const { createTemporaryChannel, deleteTemporaryChannel } = require('../utils/autoVoice.js');

module.exports = {
	name: Events.VoiceStateUpdate,
	once: false,
	execute(oldState, newState) {
		autoVoice(oldState, newState);
	},
};

async function autoVoice(oldState, newState) {
	if (!oldState.channel && newState.channel) {
		logger.silly(`[Event] ${newState.member.user.username} (${newState.member.user.id}) подключился к голосовому каналу ${newState.channel.name} (${newState.channel.id})`);
		await createTemporaryChannel(newState);
	}
	else if (oldState.channel && !newState.channel) {
		logger.silly(`[Event] ${newState.member.user.username} (${newState.member.user.id}) покинул голосовой канал ${oldState.channel.name} (${oldState.channel.id})`);
		await deleteTemporaryChannel(oldState);
	}
}