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
  searchContactbyIDInFilevine,
  searchContactByNameInFV,
  createContactInFilevinUsingName,
} from "./index.js";

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, async () => {
    // if (process.env.LOGGER_ENV === "development") {
    // }
    // hubspotToFilevine();

    // https://app-na2.hubspot.com/contacts/242315905/record/0-3/228252098235

    /*https://app-na2.hubspot.com/contacts/242315905/record/0-3/228252098235/ - this is deal record
it has this contact associated - https://app-na2.hubspot.com/contacts/242315905/record/0-1/334230687418
 */

    // TODO : remove this in production

    // fetch contacts and deals from HubSpot
    const contact = await getHubspotContact("334230687418");
    logger.info(`✅ contact: ${JSON.stringify(contact)}`);

    const token = await getTokenFromFilevine(); // Get Token  from filevine
    const dealId = await getDealIdsForContact(contact.id);

    const getDeal = await fetchHubspotDeal(dealId);
    logger.info(`✅ getDeal: ${JSON.stringify(getDeal)}`); // Tested and working fine

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
      citationIssuedTo = await searchContactByNameInFV(
        getDeal.properties?.citation_issued_to,
        token
      );

      if (!citationIssuedTo && getDeal.properties?.citation_issued_to) {
        // create contact in filevine
        citationIssuedTo = await createContactInFilevinUsingName(
          getDeal.properties?.citation_issued_to,
          token
        );
      }

      logger.info(
        `citation_issued_to: ${getDeal.properties?.citation_issued_to}`
      );

      hospitalname = await searchContactByNameInFV(
        getDeal.properties?.hospital_name,
        token
      );

      if (!hospitalname && getDeal.properties?.hospital_name) {
        // create contact in filevine
        hospitalname = await createContactInFilevinUsingName(
          getDeal.properties?.hospital_name,
          token
        );
      }

      logger.info(`hospital_name: ${getDeal.properties?.hospital_name}`);

      // let ambulanceCompanyInformation = null;

      ambulanceCompanyInformation = await searchContactByNameInFV(
        getDeal.properties?.ambulance_type,
        token
      );

      if (!ambulanceCompanyInformation && getDeal.properties?.ambulance_type) {
        // create contact in filevine
        ambulanceCompanyInformation = await createContactInFilevinUsingName(
          getDeal.properties?.ambulance_type,
          token
        );
      }

      logger.info(`ambulance_type: ${getDeal.properties?.ambulance_type}`);

      nameOfProviderSAddPhone = await searchContactByNameInFV(
        getDeal.properties?.name_of_providers,
        token
      );

      if (!nameOfProviderSAddPhone && getDeal.properties?.name_of_providers) {
        // create contact in filevine
        nameOfProviderSAddPhone = await createContactInFilevinUsingName(
          getDeal.properties?.name_of_providers,
          token
        );
      }

      logger.info(
        `nameOfProviderSAddPhone: ${getDeal.properties?.name_of_providers}`
      );

      bodyShop = await searchContactByNameInFV(
        getDeal.properties?.body_shop_type,
        token
      );

      if (!bodyShop && getDeal.properties?.body_shop_type) {
        // create contact in filevine
        bodyShop = await createContactInFilevinUsingName(
          getDeal.properties?.body_shop_type,
          token
        );
      }

      logger.info(`body_shop_type: ${getDeal.properties?.body_shop_type}`);

      // let staffMemberSendingPDLetter = null;

      staffMemberSendingPDLetter = await searchContactByNameInFV(
        getDeal.properties?.pd_letter_sent,
        token
      );

      if (!staffMemberSendingPDLetter && getDeal.properties?.pd_letter_sent) {
        // create contact in filevine
        staffMemberSendingPDLetter = await createContactInFilevinUsingName(
          getDeal.properties?.pd_letter_sent,
          token
        );
      }

      logger.info(`pd_letter_sent: ${getDeal.properties?.pd_letter_sent}`);

      // let callercontactfile = null;

      callercontactfile = await searchContactByNameInFV(
        getDeal.properties?.primary_contact,
        token
      );

      if (!callercontactfile && getDeal.properties?.primary_contact) {
        // create contact in filevine
        callercontactfile = await createContactInFilevinUsingName(
          getDeal.properties?.primary_contact,
          token
        );
      } // Expecting a phone Number

      logger.info(`primary_contact: ${getDeal.properties?.primary_contact}`);

      // let personperformingintake = null;

      personperformingintake = await searchContactByNameInFV(
        getDeal.properties?.intake_coordinator,
        token
      );

      if (!personperformingintake && getDeal.properties?.intake_coordinator) {
        // create contact in filevine
        personperformingintake = await createContactInFilevinUsingName(
          getDeal.properties?.intake_coordinator,
          token
        );
      }

      logger.info(
        `intake_coordinator: ${getDeal.properties?.intake_coordinator}`
      );

      // let spouse = null;

      spouse = await searchContactByNameInFV(
        getDeal.properties?.spouse_name,
        token
      );

      if (!spouse && getDeal.properties?.spouse_name) {
        // create contact in filevine
        spouse = await createContactInFilevinUsingName(
          getDeal.properties?.spouse_name,
          token
        );
      }

      logger.info(`spouse_name: ${getDeal.properties?.spouse_name}`);

      // let defendantSVehicleRegistered = null;

      defendantSVehicleRegistered = await searchContactByNameInFV(
        getDeal.properties?.registered_vehicle_owner,
        token
      );

      if (
        !defendantSVehicleRegistered &&
        getDeal.properties?.registered_vehicle_owner
      ) {
        // create contact in filevine
        defendantSVehicleRegistered = await createContactInFilevinUsingName(
          getDeal.properties?.registered_vehicle_owner,
          token
        );
      }

      logger.info(
        `registered_vehicle_owner: ${getDeal.properties?.registered_vehicle_owner}`
      );

      // let defendant2DriverContactCar = null;

      defendant2DriverContactCar = await searchContactByNameInFV(
        getDeal.properties?.defendant_2_driver_contact_card,
        token
      );

      if (
        !defendant2DriverContactCar &&
        getDeal.properties?.defendant_2_driver_contact_card
      ) {
        // create contact in filevine
        defendant2DriverContactCar = await createContactInFilevinUsingName(
          getDeal.properties?.defendant_2_driver_contact_card,
          token
        );
      }

      logger.info(
        `defendant_2_driver_contact_card: ${getDeal.properties?.defendant_2_driver_contact_card}`
      );

      // let defendant2VehicleRegistered = null;

      defendant2VehicleRegistered = await searchContactByNameInFV(
        getDeal.properties?.defendant_2_vehicle_registered_owner,
        token
      );

      if (
        !defendant2VehicleRegistered &&
        getDeal.properties?.defendant_2_vehicle_registered_owner
      ) {
        // create contact in filevine
        defendant2VehicleRegistered = await createContactInFilevinUsingName(
          getDeal.properties?.defendant_2_vehicle_registered_owner,
          token
        );
      }

      logger.info(
        `defendant_2_vehicle_registered_owner: ${getDeal.properties?.defendant_2_vehicle_registered_owner}`
      );

      // let defendantDriverContactCard = null;

      defendantDriverContactCard = await searchContactByNameInFV(
        getDeal.properties?.defendant_driver,
        token
      );

      if (!defendantDriverContactCard && getDeal.properties?.defendant_driver) {
        // create contact in filevine
        defendantDriverContactCard = await createContactInFilevinUsingName(
          getDeal.properties?.defendant_driver,
          token
        );
      }

      logger.info(`defendant_driver: ${getDeal.properties?.defendant_driver}`);

      // let clientSVehicleRegisteredOw = null;

      clientSVehicleRegisteredOw = await searchContactByNameInFV(
        getDeal.properties?.clients_vehicle_registered_owner,
        token
      );

      if (
        !clientSVehicleRegisteredOw &&
        getDeal.properties?.clients_vehicle_registered_owner
      ) {
        // create contact in filevine
        clientSVehicleRegisteredOw = await createContactInFilevinUsingName(
          getDeal.properties?.clients_vehicle_registered_owner,
          token
        );
      }

      logger.info(
        `clients_vehicle_registered_owner: ${getDeal.properties?.clients_vehicle_registered_owner}`
      );

      // let attorneySNameAndContactP = null;

      attorneySNameAndContactP = await searchContactByNameInFV(
        getDeal.properties?.attorneys_name,
        token
      );

      if (!attorneySNameAndContactP && getDeal.properties?.attorneys_name) {
        // create contact in filevine
        attorneySNameAndContactP = await createContactInFilevinUsingName(
          getDeal.properties?.attorneys_name,
          token
        );
      }

      logger.info(`attorneys_name: ${getDeal.properties?.attorneys_name}`);

      // let whoIsTheWorkerSCompensati = null;

      whoIsTheWorkerSCompensati = await searchContactByNameInFV(
        getDeal.properties?.workers_compensation_attorney,
        token
      );

      if (
        !whoIsTheWorkerSCompensati &&
        getDeal.properties?.workers_compensation_attorney
      ) {
        // create contact in filevine
        whoIsTheWorkerSCompensati = await createContactInFilevinUsingName(
          getDeal.properties?.workers_compensation_attorney,
          token
        );
      }

      logger.info(
        `workers_compensation_attorney: ${getDeal.properties?.workers_compensation_attorney}`
      );

      passengerContactInformation = await searchContactByNameInFV(
        getDeal.properties?.passenger_contact_phone_number,
        token
      );

      if (
        !passengerContactInformation &&
        getDeal.properties?.passenger_contact_phone_number
      ) {
        // create contact in filevine
        passengerContactInformation = await createContactInFilevinUsingName(
          getDeal.properties?.passenger_contact_phone_number,
          token
        );
      }
      logger.info(
        `passenger_contact_phone_number: ${getDeal.properties?.passenger_contact_phone_number}`
      );

      // let witnessEs_1 = null;

      witnessEs_1 = await searchContactByNameInFV(
        getDeal.properties?.witnesses,
        token
      );

      if (!witnessEs_1 && getDeal.properties?.witnesses) {
        // create contact in filevine
        witnessEs_1 = await createContactInFilevinUsingName(
          getDeal.properties?.witnesses,
          token
        );
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

    // logger.info(`dealId: ${dealId}`);
    // logger.info(`✅ getDeal: ${JSON.stringify(getDeal)}`); // Tested and working fine

    // -------------------------------------

    let filevineContact = null;
    let hubspotContact = null;
    let projectId = null;
    let filevinePersonID = null;

    let sourceId = contact.properties?.sourceid || null;
    projectId = contact.properties?.projectsourceid || null;

    logger.info(`contact source id: ${sourceId}`);

    if (sourceId && projectId) {
      // search filevine contact based on sourceid in hubspot contact
      filevineContact = await searchContactbyIDInFilevine(sourceId, token);
      filevinePersonID = filevineContact?.personId?.native || null;
      if (filevineContact) {
        logger.info(`existing Conact in filevine : ${sourceId}`);
      }
      // logger.info(`search contact in filevine: ${filevineContact}`);
    } else {
      // TODO : post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact
      filevineContact = await createContactInFilevine(contact, token, getDeal);
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
        // continue; // move to next contact
      }

      filevinePersonID = filevineContact?.personId?.native || null;

      if (filevinePersonID) {
        hubspotContact = await updateContactInHubspot(
          contact,
          filevinePersonID
        );
        logger.info(
          `Updated sourceId in Hubspot Contact: ${JSON.stringify(
            hubspotContact
          )}`
        );
      }
    }

    // ---------------------------------------

    // const filevinePayload = mapHubspotToFilevine(contact, deal);
    // logger.info(`filevinePayload: ${JSON.stringify(filevinePayload)}`);

    projectId = contact.properties?.projectsourceid || null;
    // let project = contact.properties?.projectsourceid || null;

    if (!projectId) {
      // Create project contact in Filevine
      const project = await createProjectInFilevine(
        contact,
        filevinePersonID,
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
    }

    // throw new Error("stop");

    // logger.info(`Project: ${JSON.stringify(project, null, 2)}`);

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
    const updatedIntake = await updateIntakeUnderProject(
      projectId,
      token,
      filevinePayload
    );
    logger.info(`➡✅ updatedIntake: ${JSON.stringify(updatedIntake)}`);

    // TODO : remove this in production

    logger.info(`Server is running on port ${PORT}`);
    // console.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  logger.error(`Error in starting server`, error.message);
}
