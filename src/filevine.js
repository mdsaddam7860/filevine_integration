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

    // TODO : remove this in production
    // fetch contacts and deals from HubSpot
    const contact = await getHubspotContact("334230687418");
    const deal = await fetchHubspotDeal("228252098235");
    // logger.info(`contact: ${JSON.stringify(contact)}`);
    // logger.info(`deal: ${JSON.stringify(deal)}`);
    // throw new Error("stop");
    const token = await getTokenFromFilevine(); // Get Token  from filevine
    // Map HubSpot contact/deal to Filevine payload

    const filevinePayload = mapHubspotToFilevine(contact, deal);
    logger.info(`filevinePayload: ${JSON.stringify(filevinePayload)}`);

    // Create project contact in Filevine
    const project = await createProjectInFilevine(contact, token);
    // logger.info(`project: ${JSON.stringify(project)}`);
    // console.log(`filevinePayload:`, filevinePayload);

    // Update intake under project (only once)
    // project.projectId.native,
    const updatedIntake = await updateIntakeUnderProject(
      project.projectId.native,
      token,
      filevinePayload
    );
    logger.info(`updatedIntake: ${JSON.stringify(updatedIntake)}`);
    // TODO : remove this in production

    logger.info(`Server is running on port ${PORT}`);
    // console.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  //   logger.error(`Error in starting server, ${JSON.stringify(error)}`);
  logger.error(`Error in starting server`, error.message);
}
