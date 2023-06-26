const { SlashCommandBuilder } = require("discord.js");

const { configSet } = require("../middleware/configSet.js");
const { setDefaultUserRoleConfig } = require("../controllers/setDefaultUserRoleConfig.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("конфиг-defaultuserrole")
		.setDescription("[Отладка] перезапись конфига defaultUserRole")
		.setDefaultMemberPermissions(0)

		.addRoleOption((optionChannel) =>
			optionChannel
				.setName("роль")
				.setDescription("Будет использоваться для всех подтверждённых игроков")
				.setRequired(true),
		),
	async execute(interaction) {
		await configSet(interaction, setDefaultUserRoleConfig, {
			roleId: interaction.options.getRole("роль").id,
		});
	},
};
