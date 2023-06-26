module.exports = {
	getUserInfoById,
};

const logger = require("./logger");

async function getUserInfoById({ interaction, userId }) {
	logger.debug(`userID = ${userId}`);
	if (!RegExp(/^\d+$/).test(userId)) {
		await interaction.reply({
			content: "id пользователя должен быть числом",
			ephemeral: true,
		});
		return;
	}
	// const user = await interaction.client.user.fetch(userId);
	const member = await interaction.guild.members.fetch(userId);
	// const user = await interaction.guild.members.get(userId);
	await interaction.reply({
		content: `> **Отладка** | ${member.user.username}#${
			member.user.discriminator
		}
		\`\`\`json
		${JSON.stringify(member, null, 2)}
		\`\`\`
		\`\`\`json
		${JSON.stringify(member.user, null, 2)}
		\`\`\``,
		ephemeral: true,
	});
}
