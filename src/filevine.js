import dotenv from "dotenv";
dotenv.config();

import { logger, app, hubspotToFilevine } from "./index.js";

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    if (process.env.LOGGER_ENV === "development") {
      hubspotToFilevine();
    }
    logger.info(`Server is running on port ${PORT}`);
    // console.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  //   logger.error(`Error in starting server, ${JSON.stringify(error)}`);
  logger.error(`Error in starting server`, error.message);
}
