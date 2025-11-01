import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";
const { combine, timestamp, label, prettyPrint, printf, colorize, json } =
  format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level} : ${message}`;
  // return `${timestamp} ${level} [${label}] : ${message}`;
});
const developmentLogger = function () {
  const logDir = path.join(process.cwd(), "logs");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  return createLogger({
    level: "info",
    format: combine(
      colorize(),
      timestamp({ format: "DD-MM-YYYY hh:mm:ss A" }),
      prettyPrint(),
      json(),
      loggerFormat
    ),
    // format: combine(label({ label: "filevine Integration" }), timestamp(), loggerFormat),
    defaultMeta: { service: "filevine Integration" },
    transports: [
      new transports.Console({
        level: "error",
      }),
      new transports.File({
        filename: path.join(logDir, "development.log"),
      }),
      // new transports.File({ filename: "logs/combined.log" }),
    ],
  });
};

let logger = null;
// const logger = developmentLogger();
if (process.env.LOGGER_ENV === "production") {
  logger = productionLogger();
} else {
  logger = developmentLogger();
}

if (!logger) {
  logger = developmentLogger();
}

export { logger };

const productionLogger = function () {
  return createLogger({
    level: "info",
    format: combine(
      colorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      loggerFormat
    ),
    defaultMeta: { service: "filevine Integration" },
    transports: [new transports.Console({ level: "error" })],
  });
};
