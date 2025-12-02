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
  updateHubSpotContactProjectId,
  getDealIdsForContact,
} from "./index.js";

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, async () => {
    // if (process.env.LOGGER_ENV === "development") {
    // hubspotToFilevine();
    // }

    // TODO : remove this in production

    // fetch contacts and deals from HubSpot
    const contact = await getHubspotContact("334161184473");
    logger.info(`✅ contact: ${JSON.stringify(contact)}`);
    const token = await getTokenFromFilevine(); // Get Token  from filevine

    // const filevinePayload = mapHubspotToFilevine(contact, deal);
    // logger.info(`filevinePayload: ${JSON.stringify(filevinePayload)}`);

    let projectId = contact.properties?.projectsourceid || null;
    // let project = contact.properties?.projectsourceid || null;

    if (!projectId) {
      // Create project contact in Filevine
      const project = await createProjectInFilevine(contact, token);
      projectId = project.projectId.native;
      logger.info(`projectId: ${JSON.stringify(project.projectId.native)}`);

      const update_contact_sourceId = await updateHubSpotContactProjectId(
        contact.id,
        project.projectId.native
      );
      logger.info(
        `projectId in Hubspot Contact updated: ${JSON.stringify(
          update_contact_sourceId
        )}`
      );
    }

    const dealId = await getDealIdsForContact(contact.id);

    const getDeal = await fetchHubspotDeal(dealId);

    // logger.info(`dealId: ${dealId}`);
    logger.info(`✅ getDeal: ${JSON.stringify(getDeal)}`); // Tested and working fine

    // throw new Error("stop");

    // logger.info(`Project: ${JSON.stringify(project, null, 2)}`);

    // Map HubSpot contact/deal to Filevine payload
    const filevinePayload = mapHubspotToFilevine(contact, getDeal);
    logger.info(`➡️ filevinePayload: ${JSON.stringify(filevinePayload)}`);

    // Update intake under project (only once)
    // project.projectId.native,
    const updatedIntake = await updateIntakeUnderProject(
      projectId,
      token,
      filevinePayload
    );
    logger.info(`updatedIntake: ${JSON.stringify(updatedIntake)}`);

    // TODO : remove this in production

    logger.info(`Server is running on port ${PORT}`);
    // console.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  logger.error(`Error in starting server`, error.message);
}
