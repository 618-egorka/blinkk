module.exports = {
	configSet : configSet,
};


async function configSet(interaction, controller, args) {
	try {
		const response = await controller(args);
		console.log('ссаки' + response.success);
		console.log('боди' + response.body);
		if (await response.success) {
			interaction.reply({ content: `> **Отладка** | Конфигурация перезаписана`, ephemeral: true });
			console.log(response.body);
			return;
		}
		if (!response.success) {
			interaction.reply({ content: `> **Отладка** | Ошибка базы данных`, ephemeral: true });
			console.log(response.body);
			return;
		}
	}
	catch (error) {
		interaction.reply({ content: `> **Отладка** | Незивестная ошибка`, ephemeral: true });
		console.error(error);
		return;
	}
}