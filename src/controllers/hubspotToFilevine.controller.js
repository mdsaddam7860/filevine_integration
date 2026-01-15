import {
  filevineExecutor,
  hubspotExecutor,
  logger,
  searchContactbyIDInFilevine,
  createContactInFilevine,
  updateContactInHubspot,
  createProjectInFilevine,
  updateIntakeUnderProject,
  mapHubspotToFilevine,
  updateHubSpotContactProjectId,
  searchContactByNameInFV,
  createContactInFilevinUsingName,
  updateContactInFilevine,
  getLastSyncDate,
  updateLastSyncDate,
  filevineContactPayload,
  getDealFromHubspot,
  getContactIdsForDeal,
  getHubspotContact,
  updateDealInHubspot,
} from "../index.js";

/* Workflow

Query hubspot deal -> search associated contact -> search filevine contact based on sourceid in hubspot contact -> if source id is blank -> post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact, then create project contact in filevine -> Update deal in hubspot -> update intake under project

*/
async function hubspotToFilevine() {
  try {
    // const lastSyncDate = getLastSyncDate();
    // Update only after successful full sync
    // updateLastSyncDate(new Date());

    // const getContact = await getContactFromHubspot({ lastSyncDate });
    // logger.info(`Length of contact: ${getContact.length}`);

    const deals = await getDealFromHubspot();
    logger.info(`Length of Deals: ${deals.length}`);

    for (const getDeal of deals) {
      try {
        logger.info(` ➡️ deals: ${JSON.stringify(getDeal)}`);

        const contactId = await getContactIdsForDeal(getDeal.id);
        if (!contactId) {
          logger.warn(`Contact not found for deal: ${getDeal.id}`);
          continue;
        }
        const contact = await getHubspotContact(contactId);
        if (!contact) {
          logger.warn(`Contact not found for deal: ${getDeal.id}`);
          continue;
        }

        logger.info(` ➡️  Contact: ${JSON.stringify(contact)}`);

        let citationIssuedTo = null;
        let nameOfProviderSAddPhone = null;
        let bodyShop = null;
        let hospitalname = null;
        let ambulanceCompanyInformation = null;
        let staffMemberSendingPDLetter = null;
        let callercontactfile = null;
        let personperformingintake = null;
        let spouse = null;
        let defendantSVehicleRegistered = null;
        let defendant2DriverContactCar = null;
        let defendant2VehicleRegistered = null;
        let defendantDriverContactCard = null;
        let clientSVehicleRegisteredOw = null;
        let attorneySNameAndContactP = null;
        let whoIsTheWorkerSCompensati = null;
        let passengerContactInformation = null;
        let witnessEs_1 = null;

        if (getDeal) {
          citationIssuedTo = await filevineExecutor(
            () =>
              searchContactByNameInFV(getDeal.properties?.citation_issued_to),
            { name: getDeal.properties?.citation_issued_to }
          );

          if (!citationIssuedTo && getDeal.properties?.citation_issued_to) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.citation_issued_to,
              contact
            );
            // create contact in filevine
            citationIssuedTo = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.citation_issued_to }
            );
          }

          logger.info(
            `citation_issued_to: ${getDeal.properties?.citation_issued_to}`
          );

          hospitalname = await filevineExecutor(
            () => searchContactByNameInFV(getDeal.properties?.hospital_name),
            { name: getDeal.properties?.hospital_name }
          );

          if (!hospitalname && getDeal.properties?.hospital_name) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.hospital_name,
              contact
            );

            // create contact in filevine
            hospitalname = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.hospital_name }
            );
          }

          logger.info(`hospital_name: ${getDeal.properties?.hospital_name}`);

          // let ambulanceCompanyInformation = null;

          ambulanceCompanyInformation = await searchContactByNameInFV(
            getDeal.properties?.ambulance_type
          );

          if (
            !ambulanceCompanyInformation &&
            getDeal.properties?.ambulance_type
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.ambulance_type,
              contact
            );

            // create contact in filevine
            ambulanceCompanyInformation = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { payload }
            );
          }

          logger.info(`ambulance_type: ${getDeal.properties?.ambulance_type}`);

          nameOfProviderSAddPhone = await filevineExecutor(
            () =>
              searchContactByNameInFV(getDeal.properties?.name_of_providers),
            { name: getDeal.properties?.name_of_providers }
          );

          if (
            !nameOfProviderSAddPhone &&
            getDeal.properties?.name_of_providers
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.name_of_providers,
              contact
            );

            // create contact in filevine
            nameOfProviderSAddPhone = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.name_of_providers }
            );
          }

          logger.info(
            `nameOfProviderSAddPhone: ${getDeal.properties?.name_of_providers}`
          );

          bodyShop = await filevineExecutor(
            () => searchContactByNameInFV(getDeal.properties?.body_shop_type),
            { name: getDeal.properties?.body_shop_type }
          );

          if (!bodyShop && getDeal.properties?.body_shop_type) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.body_shop_type,
              contact
            );

            // create contact in filevine
            bodyShop = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.body_shop_type }
            );
          }

          logger.info(`body_shop_type: ${getDeal.properties?.body_shop_type}`);

          // let staffMemberSendingPDLetter = null;

          staffMemberSendingPDLetter = await filevineExecutor(
            () => searchContactByNameInFV(getDeal.properties?.pd_letter_sent),
            { name: getDeal.properties?.pd_letter_sent }
          );

          if (
            !staffMemberSendingPDLetter &&
            getDeal.properties?.pd_letter_sent
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.pd_letter_sent,
              contact
            );

            // create contact in filevine
            staffMemberSendingPDLetter = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.pd_letter_sent }
            );
          }

          logger.info(`pd_letter_sent: ${getDeal.properties?.pd_letter_sent}`);

          // let callercontactfile = null;

          callercontactfile = await filevineExecutor(
            () => searchContactByNameInFV(getDeal.properties?.primary_contact),
            { name: getDeal.properties?.primary_contact }
          );

          if (!callercontactfile && getDeal.properties?.primary_contact) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.primary_contact,
              contact
            );

            // create contact in filevine
            callercontactfile = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.primary_contact }
            );
          } // Expecting a phone Number

          logger.info(
            `primary_contact: ${getDeal.properties?.primary_contact}`
          );

          // let personperformingintake = null;

          personperformingintake = await filevineExecutor(
            () =>
              searchContactByNameInFV(getDeal.properties?.intake_coordinator),
            { name: getDeal.properties?.intake_coordinator }
          );

          if (
            !personperformingintake &&
            getDeal.properties?.intake_coordinator
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.intake_coordinator,
              contact
            );
            // create contact in filevine
            personperformingintake = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.intake_coordinator }
            );
          }

          logger.info(
            `intake_coordinator: ${getDeal.properties?.intake_coordinator}`
          );

          // let spouse = null;

          spouse = await filevineExecutor(
            () => searchContactByNameInFV(getDeal.properties?.spouse_name),
            { name: getDeal.properties?.spouse_name }
          );

          if (!spouse && getDeal.properties?.spouse_name) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.spouse_name,
              contact
            );

            // create contact in filevine
            spouse = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.spouse_name }
            );
          }

          logger.info(`spouse_name: ${getDeal.properties?.spouse_name}`);

          // let defendantSVehicleRegistered = null;

          defendantSVehicleRegistered = await filevineExecutor(
            () =>
              searchContactByNameInFV(
                getDeal.properties?.registered_vehicle_owner
              ),
            { name: getDeal.properties?.registered_vehicle_owner }
          );

          if (
            !defendantSVehicleRegistered &&
            getDeal.properties?.registered_vehicle_owner
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.registered_vehicle_owner,
              contact
            );
            // create contact in filevine
            defendantSVehicleRegistered = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.registered_vehicle_owner }
            );
          }

          logger.info(
            `registered_vehicle_owner: ${getDeal.properties?.registered_vehicle_owner}`
          );
          // TODO: Add filevineExecutor From here
          // let defendant2DriverContactCar = null;

          defendant2DriverContactCar = await filevineExecutor(
            () =>
              searchContactByNameInFV(
                getDeal.properties?.defendant_2_driver_contact_card
              ),
            { name: getDeal.properties?.defendant_2_driver_contact_card }
          );

          if (
            !defendant2DriverContactCar &&
            getDeal.properties?.defendant_2_driver_contact_card
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.defendant_2_driver_contact_card,
              contact
            );
            // create contact in filevine
            defendant2DriverContactCar = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.defendant_2_driver_contact_card }
            );
          }

          logger.info(
            `defendant_2_driver_contact_card: ${getDeal.properties?.defendant_2_driver_contact_card}`
          );

          // let defendant2VehicleRegistered = null;

          defendant2VehicleRegistered = await filevineExecutor(
            () =>
              searchContactByNameInFV(
                getDeal.properties?.defendant_2_vehicle_registered_owner
              ),
            { name: getDeal.properties?.defendant_2_vehicle_registered_owner }
          );

          if (
            !defendant2VehicleRegistered &&
            getDeal.properties?.defendant_2_vehicle_registered_owner
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.defendant_2_vehicle_registered_owner,
              contact
            );
            // create contact in filevine
            defendant2VehicleRegistered = await filevineExecutor(
              () => createContactInFilevinUsingName(payload),
              { name: getDeal.properties?.defendant_2_vehicle_registered_owner }
            );
          }

          logger.info(
            `defendant_2_vehicle_registered_owner: ${getDeal.properties?.defendant_2_vehicle_registered_owner}`
          );

          // let defendantDriverContactCard = null;

          defendantDriverContactCard = await searchContactByNameInFV(
            getDeal.properties?.defendant_driver
          );

          if (
            !defendantDriverContactCard &&
            getDeal.properties?.defendant_driver
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.defendant_driver,
              contact
            );
            // create contact in filevine
            defendantDriverContactCard = await createContactInFilevinUsingName(
              payload
            );
          }

          logger.info(
            `defendant_driver: ${getDeal.properties?.defendant_driver}`
          );

          // let clientSVehicleRegisteredOw = null;

          clientSVehicleRegisteredOw = await searchContactByNameInFV(
            getDeal.properties?.registered_vehicle_owner
          );

          if (
            !clientSVehicleRegisteredOw &&
            getDeal.properties?.registered_vehicle_owner
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.registered_vehicle_owner,
              contact
            );
            // create contact in filevine
            clientSVehicleRegisteredOw = await createContactInFilevinUsingName(
              payload
            );
          }

          logger.info(
            `clients_vehicle_registered_owner: ${getDeal.properties?.registered_vehicle_owner}`
          );

          // let attorneySNameAndContactP = null;

          attorneySNameAndContactP = await searchContactByNameInFV(
            getDeal.properties?.attorneys_name
          );

          if (!attorneySNameAndContactP && getDeal.properties?.attorneys_name) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.attorneys_name,
              contact
            );
            // create contact in filevine
            attorneySNameAndContactP = await createContactInFilevinUsingName(
              payload
            );
          }

          logger.info(`attorneys_name: ${getDeal.properties?.attorneys_name}`);

          // let whoIsTheWorkerSCompensati = null;

          whoIsTheWorkerSCompensati = await searchContactByNameInFV(
            getDeal.properties?.workers_compensation_attorney
          );

          if (
            !whoIsTheWorkerSCompensati &&
            getDeal.properties?.workers_compensation_attorney
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.workers_compensation_attorney,
              contact
            );
            // create contact in filevine
            whoIsTheWorkerSCompensati = await createContactInFilevinUsingName(
              payload
            );
          }

          logger.info(
            `workers_compensation_attorney: ${getDeal.properties?.workers_compensation_attorney}`
          );

          passengerContactInformation = await searchContactByNameInFV(
            getDeal.properties?.passenger_contact_phone_number
          );

          if (
            !passengerContactInformation &&
            getDeal.properties?.passenger_contact_phone_number
          ) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.passenger_contact_phone_number,
              contact
            );
            // create contact in filevine
            passengerContactInformation = await createContactInFilevinUsingName(
              payload
            );
          }
          logger.info(
            `passenger_contact_phone_number: ${getDeal.properties?.passenger_contact_phone_number}`
          );

          // let witnessEs_1 = null;

          witnessEs_1 = await searchContactByNameInFV(
            getDeal.properties?.witnesses
          );

          if (!witnessEs_1 && getDeal.properties?.witnesses) {
            // Create payload
            const payload = filevineContactPayload(
              getDeal.properties?.witnesses,
              contact
            );
            // create contact in filevine
            witnessEs_1 = await createContactInFilevinUsingName(payload);
          }
          logger.info(`witnesses: ${getDeal.properties?.witnesses}`);

          // let nameOfProviderSAddPhone = null;

          // nameOfProviderSAddPhone = await searchContactByNameInFV(
          //   getDeal.properties?.name_of_providers,
          //   token
          // );

          // if (!nameOfProviderSAddPhone && getDeal.properties?.name_of_providers) {
          //   // create contact in filevine
          //   nameOfProviderSAddPhone = await createContactInFilevinUsingName(
          //     getDeal.properties?.name_of_providers,
          //     token
          //   );
          // }

          // logger.info(
          //   `citationIssuedTo: ${JSON.stringify(
          //     citationIssuedTo,
          //     null,
          //     2
          //   )}``ambulanceCompanyInformation: ${JSON.stringify(
          //     ambulanceCompanyInformation,
          //     null,
          //     2
          //   )}`
          // );
        }

        let filevineContact = null;
        let hubspotContact = null;
        let filevinePersonID = null;

        let sourceId = contact.properties?.sourceid || null;

        logger.info(`contact source id: ${sourceId}`);

        if (sourceId) {
          // search filevine contact based on sourceid in hubspot contact
          filevineContact = await filevineExecutor(
            () => searchContactbyIDInFilevine(sourceId),
            { name: "searchContactbyIDInFilevine" }
          );
          filevinePersonID = filevineContact?.personId?.native || null;
          if (filevineContact) {
            logger.info(`existing Conact in filevine : ${sourceId}`);
          }
          // logger.info(`search contact in filevine: ${filevineContact}`);
        } else {
          filevineContact = await filevineExecutor(
            () => createContactInFilevine(contact, getDeal),
            { name: "createContactInFilevine" }
          );
          logger.info(
            `Created Contact in Filevine: ${JSON.stringify(
              filevineContact,
              null,
              2
            )}`
          );

          if (!filevineContact) {
            logger.error(
              `❌ Filevine contact creation failed for HubSpot contact ID: ${contact.id}`
            );
            continue; // move to next contact
          }

          filevinePersonID = filevineContact?.personId?.native || null;

          if (filevinePersonID) {
            hubspotContact = await hubspotExecutor(
              () => updateContactInHubspot(contact, filevinePersonID),
              { name: "updateContactInHubspot" }
            );
            logger.info(
              `Updated sourceId in Hubspot Contact: ${JSON.stringify(
                hubspotContact
              )}`
            );
          }
        }

        // update contact in FV here
        if (filevineContact) {
          const updateContact = await filevineExecutor(
            () =>
              updateContactInFilevine(filevineContact.personId.native, contact),
            { name: "updateContactInFilevine" }
          );

          logger.info(
            `Updated Contact in Filevine: ${JSON.stringify(updateContact)}`
          );
        }

        let projectId = contact.properties?.projectsourceid || null;

        if (!projectId) {
          // Create project contact in Filevine
          const project = await filevineExecutor(
            () => createProjectInFilevine(contact, filevinePersonID),
            { name: "Filevine Project" }
          );
          projectId = project.projectId.native;
          logger.info(`project created: ${JSON.stringify(project)}`);

          const update_contact_sourceId = await hubspotExecutor(
            () =>
              updateHubSpotContactProjectId(
                contact.id,
                project.projectId.native
              ),
            { name: "updateHubSpotContactProjectId" }
          );
          logger.info(
            `projectId in Hubspot Contact updated: ${JSON.stringify(
              update_contact_sourceId
            )}`
          );

          // update Deal in Hubspot
          const updateDeal = await hubspotExecutor(
            () => updateDealInHubspot(getDeal?.id, project?.projectUrl),
            { name: "updateDealInHubspot" }
          );
          logger.info(`Updated Deal in Hubspot: ${JSON.stringify(updateDeal)}`);
        }

        // Map HubSpot contact/deal to Filevine payload
        const filevinePayload = mapHubspotToFilevine(
          contact,
          getDeal,
          citationIssuedTo,
          hospitalname,
          ambulanceCompanyInformation,
          nameOfProviderSAddPhone,
          bodyShop,
          staffMemberSendingPDLetter,
          callercontactfile,
          personperformingintake,
          spouse,
          defendantSVehicleRegistered,
          defendant2DriverContactCar,
          defendant2VehicleRegistered,
          defendantDriverContactCard,
          clientSVehicleRegisteredOw,
          attorneySNameAndContactP,
          whoIsTheWorkerSCompensati,
          passengerContactInformation,
          witnessEs_1
        );
        logger.info(`➡️ filevinePayload: ${JSON.stringify(filevinePayload)}`);

        // Update intake under project (only once)
        // project.projectId.native,
        const updatedIntake = await filevineExecutor(
          () => updateIntakeUnderProject(projectId, filevinePayload),
          { name: "updateIntakeUnderProject" }
        );

        logger.info(`✅ updatedIntake: ${JSON.stringify(updatedIntake)}`);
      } catch (error) {
        logger.error("Error in hubspotToFilevine loop", error);
      }
    }
  } catch (error) {
    logger.error("Error in hubspotToFilevine", error);
    return;
  }
}

export { hubspotToFilevine };
