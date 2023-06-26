module.exports = {
	userFormOnboardMessage,
};

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function userFormOnboardMessage({ channel, member, formData }) {
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('buttonUserFormAccept')
				.setLabel('Принять')
				.setStyle(ButtonStyle.Success))
		.addComponents(
			new ButtonBuilder()
				.setCustomId('buttonUserFormReject')
				.setLabel('Отклонить')
				.setStyle(ButtonStyle.Danger),
		);

	await channel.send({ content: `> Заявка от **${member.user.username}#${member.user.discriminator}** (${member.user.id})\n
	> Добавь пользователя в whitelist сервера перед принятием заявки\n
	> Minecraft ник **${formData.userMinecraftName}**
	\`\`\`${formData.formDescription}\`\`\``, components: [row] });
}