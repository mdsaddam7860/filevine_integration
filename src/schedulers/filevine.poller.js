import cron from "node-cron";
import { logger } from "../index.js";
import { hubspotToFilevine } from "../controllers/hubspotToFilevine.controller.js";

let isRunning = false; // in-process lock

const startFilevinePolling = () => {
  // Run Every minute Scheduler (1 * * * *)
  logger.info("Scheduler Imported: Filevine Poller");
  cron.schedule("*/15 * * * *", async () => {
    if (isRunning) {
      logger.warn("Filevine poll skipped: previous run still in progress");
      return;
    }

    isRunning = true;
    logger.info("Filevine polling started");

    try {
      await hubspotToFilevine();
      logger.info("Filevine polling completed successfully");
    } catch (error) {
      logger.error("Filevine polling failed", error);
    } finally {
      isRunning = false;
    }
  });
};

export { startFilevinePolling };
