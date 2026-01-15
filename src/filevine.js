import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import { app } from "./app.js";
import { logger } from "./index.js";

import { startFilevinePolling } from "./schedulers/filevine.poller.js";
// import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";

logger.info(`CWD: ${process.cwd()}`);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);

  startFilevinePolling();
});
