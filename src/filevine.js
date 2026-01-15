import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import { app } from "./app.js";
import { logger } from "./index.js";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});
import { startFilevinePolling } from "./schedulers/filevine.poller.js";
// import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";

logger.info(`CWD: ${process.cwd()}`);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);

  startFilevinePolling();
});
