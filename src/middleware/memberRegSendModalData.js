module.exports = {
	memberRegSendModalData,
};

const logger = require('../utils/logger');
const { addUserFormInfo } = require('../controllers/addUserFormInfo.js');
const { getUserFormInfo } = require('../controllers/getUserFormInfo.js');
const { userFormNotify } = require('../utils/userFormNotify.js');

async function memberRegSendModalData(interaction, user) {

	const checkResponse = await getUserFormInfo({ userMinecraftName: interaction.fields.getTextInputValue('minecraftNameInput') });

	if (!checkResponse.success) {
		await interaction.reply({ content: `> Что-то пошло не так(\n Попробуй ещё раз`, ephemeral: true });
		return;
	}
	if (checkResponse.success && checkResponse.body !== null) {
		await interaction.reply({ content: `> Кто-то уже использует ник ${interaction.fields.getTextInputValue('minecraftNameInput')}, попробуй ещё раз с другим именем`, ephemeral: true });
		return;
	}

	const modalResponse = await addUserFormInfo({
		userMinecraftName: interaction.fields.getTextInputValue('minecraftNameInput'),
		userMinecraftPassword: interaction.fields.getTextInputValue('minecraftPasswordInput'),
		userDiscordId: user.id,
		formStatus: 'inProgress',
		formDescription: interaction.fields.getTextInputValue('descriptionInput'),
	});

	if (!modalResponse.success) {
		await interaction.reply({ content: `> Во время отправления что-то пошло не так(\n Попробуй ещё раз`, ephemeral: true });
		return;
	}

	await userFormNotify(user.id, interaction);
	await user.send("> Привет, твоя заявка обрабатывается, я напишу, когда тебя примут)");
	await interaction.reply({ content: `> Проверь лс)`, ephemeral: true });


	// helperTools.memberTempleConfigWrite('./data/memderReg/memderRegTemp.json', member.id);

	// await channel.send(
	// 	interaction.fields.getTextInputValue('minecraftNameInput'),
	// 	interaction.fields.getTextInputValue('minecraftPasswordInput'),
	// 	interaction.fields.getTextInputValue('descriptionInput'),
	// );
}

// function memberIdCheck(member) {
// 	let result = false;
// 	JSON.parse(fs.readFileSync('./data/memderReg/memderRegTemp.json')).templeMemberId
// 		.forEach(id => {
// 			if (id == member.id) result = true;
// 		});
// 	return result;
// }