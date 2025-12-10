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
  createContactInFilevine,
  updateContactInHubspot,
} from "./index.js";

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, async () => {
    // if (process.env.LOGGER_ENV === "development") {
    // }
    // hubspotToFilevine();

    // https://app-na2.hubspot.com/contacts/242315905/record/0-3/228252098235

    // TODO : remove this in production

    // fetch contacts and deals from HubSpot
    const contact = await getHubspotContact("334230687418");
    logger.info(`✅ contact: ${JSON.stringify(contact)}`);
    const token = await getTokenFromFilevine(); // Get Token  from filevine

    // -------------------------------------

    let filevineContact = null;
    let hubspotContact = null;

    let sourceId = contact.properties?.sourceid || null;
    // let project = contact.properties?.projectsourceid || null;

    logger.info(`contact source id: ${sourceId}`);

    // if (sourceId) {
    //   // search filevine contact based on sourceid in hubspot contact
    //   filevineContact = await searchContactbyIDInFilevine(sourceId, token);
    //   if (filevineContact) {
    //     logger.info(`existing Conact in filevine : ${sourceId}`);
    //   }
    //   // logger.info(`search contact in filevine: ${filevineContact}`);
    // } else {
    // TODO : post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact
    filevineContact = await createContactInFilevine(contact, token);
    logger.info(
      `Created Contact in Filevine: ${JSON.stringify(filevineContact, null, 2)}`
    );

    if (!filevineContact) {
      logger.error(
        `❌ Filevine contact creation failed for HubSpot contact ID: ${contact.id}`
      );
      // continue; // move to next contact
      // }

      const filevinePersonID = filevineContact?.personId?.native || null;

      if (filevinePersonID) {
        hubspotContact = await updateContactInHubspot(
          contact,
          filevinePersonID
        );
        logger.info(`Updated sourceId in Hubspot Contact: ${hubspotContact}`);
      }
    }

    // ---------------------------------------

    // const filevinePayload = mapHubspotToFilevine(contact, deal);
    // logger.info(`filevinePayload: ${JSON.stringify(filevinePayload)}`);

    let projectId = contact.properties?.projectsourceid || null;
    // let project = contact.properties?.projectsourceid || null;

    // if (!projectId) {
    // Create project contact in Filevine
    const project = await createProjectInFilevine(
      contact,
      filevineContact.personId.native,
      token
    );
    projectId = project.projectId.native;
    logger.info(`project created: ${JSON.stringify(project)}`);

    const update_contact_sourceId = await updateHubSpotContactProjectId(
      contact.id,
      project.projectId.native
    );
    logger.info(
      `projectId in Hubspot Contact updated: ${JSON.stringify(
        update_contact_sourceId
      )}`
    );
    // }

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
