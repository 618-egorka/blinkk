module.exports = {
	userFormAccept,
};

const logger = require("../utils/logger");
const { readCashe } = require('../store/readCashe.js');

async function userFormAccept({ interaction, userId, message }) {
	const cashe = readCashe();
	if (!cashe.success) return;
	const roleId = cashe.body.defaultuserroleconfigs.roleId;

	const guild = interaction.guild;
	const member = await guild.members.fetch(userId);
	await member.roles.add(roleId);
	await message.delete();
}

