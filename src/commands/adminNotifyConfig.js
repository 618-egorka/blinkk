const { SlashCommandBuilder, ChannelType } = require("discord.js");

const { configSet } = require("../middleware/configSet.js");
const {
	setAdminNotifyConfig,
} = require("../controllers/setAdminNotifyConfig.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("конфиг-adminnotify")
		.setDescription("[Отладка] перезапись конфига adminNotify")
		.setDefaultMemberPermissions(0)

		.addChannelOption((optionChannel) =>
			optionChannel
				.setName("канал")
				.setDescription("Канал для уведомлений бот -> админ")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText),
		),
	async execute(interaction) {
		await configSet(interaction, setAdminNotifyConfig, {
			primaryChannelId: interaction.options.getChannel("канал").id,
		});
	},
};
