import {
  logger,
  app,
  AxiosFilevine,
  hubspotAxios,
  AxiosFilevineAuth,
  getTokenFromFilevine,
  getContactFromHubspot,
  searchContactbyIDInFilevine,
  createContactInFilevine,
  updateContactInHubspot,
  createProjectInFilevine,
  getIntakeByProjectID,
  updateIntakeUnderProject,
  mapHubspotToFilevine,
} from "../index.js";

// async function hubspotToFilevine() {
//   try {
//     const token = await getTokenFromFilevine();
//     // logger.info(`token: ${token}`);

//     // Get contact from hubspot and create contact in filevine
//     // const getContact = await getContactFromHubspot();

//     // search contact in filevne
//     const res = await searchContactbyIDInFilevine("996817830", token);

//     logger.info(`res: ${res}`);
//   } catch (error) {
//     logger.error("Error in filevineToHubspot", error);
//     return;
//   }
// }

/* Workflow

Query hubspot contact -> search filevine contact based on sourceid in hubspot contact -> if source id is blank -> post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact, then create project contact in filevine

*/
async function hubspotToFilevine() {
  try {
    const token = await getTokenFromFilevine(); // Get Token  from filevine

    const getContact = await getContactFromHubspot(); // Get contact from hubspot
    logger.info(`Length of contact: ${getContact.length}`);

    // Loop contact from hubspot
    for (const contact of getContact) {
      try {
        // logger.info(`Contact: ${JSON.stringify(contact, null, 2)}`);
        let filevineContact = null;
        let hubspotContact = null;

        let sourcid = contact.properties?.sourceid || null;

        if (sourcid) {
          // search filevine contact based on sourceid in hubspot contact
          filevineContact = await searchContactbyIDInFilevine(sourcid, token);
          if (filevineContact) {
            logger.info(`existing Conact in filevine : ${sourcid}`);
          }
          // logger.info(`search contact in filevine: ${filevineContact}`);
        } else {
          // post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact
          filevineContact = await createContactInFilevine(contact, token);
          // logger.info(
          //   `Created Contact in Filevine: ${JSON.stringify(
          //     filevineContact,
          //     null,
          //     2
          //   )}`
          // );

          if (!filevineContact) {
            logger.error(
              `❌ Filevine contact creation failed for HubSpot contact ID: ${contact.id}`
            );
            continue; // move to next contact
          }

          const filevinePersonID = filevineContact?.personId?.native || null;

          if (filevinePersonID) {
            hubspotContact = await updateContactInHubspot(
              contact,
              filevinePersonID
            );
            logger.info(`Updated Contact in Hubspot: ${hubspotContact}`);
          }
        }

        // Create project contact in Filevine
        const project = await createProjectInFilevine(contact, token);

        // Map HubSpot contact/deal to Filevine payload
        const filevinePayload = mapHubspotToFilevine(contact);

        // Update intake under project (only once)
        const updatedIntake = await updateIntakeUnderProject(
          project.projectId.native,
          token,
          filevinePayload
        );

        logger.info(
          `Updated Intake: ${JSON.stringify(updatedIntake, null, 2)}`
        );
      } catch (error) {
        logger.error("Error in hubspotToFilevine", error);
        continue; // continue with next contact
      }
    }

    // todo : remove before production
    // const res = await searchContactbyIDInFilevine("996817830", token);
    // logger.info(`res: ${res}`);
    // todo : remove before production
  } catch (error) {
    logger.error("Error in hubspotToFilevine", error);
    return;
  }
}

export { hubspotToFilevine };
