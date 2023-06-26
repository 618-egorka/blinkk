// XXX: Тестовая версия, ничего не работает

require('dotenv').config();
const logger = require('./src/utils/logger');

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// подключаемся к базе данных
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.qm6kypp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

logger.info(`Подключение к базе данных`);

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((response) => {
	console.log('MongoDB успешно подключена');
	logger.info(`База данных подключена`);
	getCashe();
})
.catch(error => logger.error(`Ошибка базы данных ${error}`););

// получаем список файлов моделей
const modelsPath = path.join(__dirname, './src/models');
const modelFiles = fs.readdirSync(modelsPath);

// импортируем каждую модель и создаем ее в базе данных
async function migrate() {
  for (const file of modelFiles) {
    if (file.endsWith('.js')) {
      const model = require(path.join(modelsPath, file));
      await model.createCollection();
    }
  }
}

migrate().then(() => {
	logger.info(`Миграция завершена успешно`);
  mongoose.disconnect();
}).catch((error) => {
	logger.info(`Ошибка в ходе миграции ${error}`);
  mongoose.disconnect();
});