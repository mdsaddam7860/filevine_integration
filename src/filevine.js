import "dotenv/config";

// import dotenv from "dotenv";
// dotenv.config();
// import path from "path";
// dotenv.config({
//   path: path.resolve(process.cwd(), ".env"),
// });

import { app } from "./app.js";
import { logger } from "./index.js";

import { startFilevinePolling } from "./schedulers/filevine.poller.js";
// import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";

logger.info(`CWD: ${process.cwd()}`);
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
logger.info(`HS : ${process.env.HUBSPOT_API_KEY}`);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);

  startFilevinePolling();
});
