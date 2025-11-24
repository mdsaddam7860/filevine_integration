import dotenv from "dotenv";
dotenv.config();

import {
  logger,
  app,
  hubspotToFilevine,
  getHubspotContact,
  fetchHubspotDeal,
  mapHubspotToFilevine,
  createProjectInFilevine,
  updateIntakeUnderProject,
  getTokenFromFilevine,
} from "./index.js";

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, async () => {
    // if (process.env.LOGGER_ENV === "development") {
    //   hubspotToFilevine();
    // }

    {
      // TODO : remove this in production

      // fetch contacts and deals from HubSpot
      const contact = await getHubspotContact();
      const deal = await fetchHubspotDeal();

      const token = await getTokenFromFilevine(); // Get Token  from filevine

      // Create project contact in Filevine
      // const project = await createProjectInFilevine(contact, token);

      // logger.info(`project: ${JSON.stringify(project)}`);

      // Map HubSpot contact/deal to Filevine payload
      const filevinePayload = mapHubspotToFilevine(contact, deal);

      // console.log(`filevinePayload:`, filevinePayload);
      // throw new Error("stop");

      // logger.info(`filevinePayload: ${JSON.stringify(filevinePayload)}`);

      // Update intake under project (only once)
      // project.projectId.native,
      const updatedIntake = await updateIntakeUnderProject(
        "992367690",
        token,
        filevinePayload
      );

      // logger.info(`updatedIntake: ${JSON.stringify(updatedIntake)}`);
      // TODO : remove this in production
    }
    logger.info(`Server is running on port ${PORT}`);
    // console.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  //   logger.error(`Error in starting server, ${JSON.stringify(error)}`);
  logger.error(`Error in starting server`, error.message);
}
