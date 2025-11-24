import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";
const { combine, timestamp, label, prettyPrint, printf, colorize, json } =
  format;

const logDir = path.resolve("logs");

// Create logs folder if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level} : ${message}`;
  // return `${timestamp} ${level} [${label}] : ${message}`;
});
// Production logger
const productionLogger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    loggerFormat
  ),
  defaultMeta: { service: "filevine Integration" },
  transports: [
    // Console logs for info and above
    new transports.Console({ level: "info" }),
    // File logs for persistence
    new transports.File({
      filename: path.join(logDir, "production.log"),
      level: "info",
      format: combine(timestamp(), json()),
    }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: combine(timestamp(), json()),
    }),
  ],
});

// Production logger
const developmentLogger = () => {
  return createLogger({
    level: "info", // minimum level to log
    format: combine(timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), loggerFormat),
    defaultMeta: { service: "filevine-integration" },
    transports: [
      // Console logs for info+ (includes info, warn, error)
      new transports.Console({ level: "info" }),

      // File logs for info+ (all info and above)
      new transports.File({ filename: path.join(logDir, "production.log") }),
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

// const productionLogger = function () {
//   return createLogger({
//     level: "info",
//     format: combine(
//       colorize(),
//       timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
//       loggerFormat
//     ),
//     defaultMeta: { service: "filevine Integration" },
//     transports: [new transports.Console({ level: "error" })],
//   });
// };
