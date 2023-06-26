require("dotenv").config();
const winston = require("winston");
const path = require("path");

// создаем папку logs, если ее нет
const fs = require("fs");
const logsDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir);
}

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.prettyPrint(),
		// winston.format.json()
	),
	defaultMeta: { service: process.env.SERVICE_NAME },
	transports: [
		new winston.transports.File({
			filename: path.join(logsDir, "error.log"),
			level: "error",
			format: winston.format.combine(
				winston.format.timestamp({
					format: "YYYY-MM-DD HH:mm:ss",
				}),
				winston.format.errors({ stack: true }),
				winston.format.splat(),
				winston.format.prettyPrint(),
				winston.format.json(),
			),
		}),
		new winston.transports.File({
			filename: path.join(logsDir, "combined.log"),
			format: winston.format.combine(
				winston.format.timestamp({
					format: "YYYY-MM-DD HH:mm:ss",
				}),
				winston.format.errors({ stack: true }),
				winston.format.splat(),
				winston.format.prettyPrint(),
				winston.format.json(),
			),
		}),
	],
});

if (process.env.RUN_MODE === "PROD") {
	logger.level = process.env.PROD_LOGGER_LEVEL || "info";
}

if (process.env.RUN_MODE !== "PROD") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp({
					format: "HH:mm:ss",
				}),
				winston.format.errors({ stack: true }),
				winston.format.splat(),
				winston.format.prettyPrint(),
				winston.format.simple(),
			),
		}),
	);
	if (process.env.RUN_MODE === "DEV") {
		logger.level = process.env.DEV_LOGGER_LEVEL || "debug";
	}
}

// if (process.env.RUN_MODE === 'DEBUG') {
// 	logger.add(new winston.transports.Console({
// 		level: 'debug',
// 		format: winston.format.combine(
// 			winston.format.colorize(),
// 			winston.format.timestamp({
// 				format: 'HH:mm:ss',
// 			}),
// 			winston.format.errors({ stack: true }),
// 			winston.format.splat(),
// 			winston.format.prettyPrint(),
// 			winston.format.simple()),
// 	}));
// }

module.exports = logger;
