const fs = require('node:fs');

module.exports = {
	channelConfigWrite : channelConfigWrite,
	channelAndCategoryConfigWrite : channelAndCategoryConfigWrite,
	memberTempleConfigWrite : memberTempleConfigWrite,
};

async function channelConfigWrite(interaction, file, channel) {
	fs.writeFile(file, JSON.stringify(
		{ 'categoryId': null, 'createChannelId': channel.id },
	), (error) => { errorReply(interaction, error); });
}

async function channelAndCategoryConfigWrite(interaction, file, channel, category) {
	fs.writeFile(file, JSON.stringify(
		{ 'categoryId': category.id, 'createChannelId': channel.id },
	), (error) => { errorReply(interaction, error); });
}

async function memberTempleConfigWrite(file, memberId) {
	fs.readFile(file, (err, data) => {
		if (err) throw err;
		data = JSON.parse(data);
		data.templeMemberId.push(memberId);
		fs.writeFile(file, JSON.stringify(data),
			(error) => { console.error(error); });
	});
}


function errorReply(interaction, error) {
	if (error) {
		console.error(error);
		interaction.reply({ content: '> **Ошибка** | При выполнении вспомогательного модуля возникла ошибка', ephemeral: true });
	}
	else {
		interaction.reply({ content: '> **Отладка** | Конфигурация перезаписана', ephemeral: true });
	}
}