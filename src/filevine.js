import dotenv from "dotenv";
dotenv.config();

import {
  filevineExecutor,
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
  filevineContactPayload,
  filevineTokenManager,
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

    const token = await filevineTokenManager.getToken();
    logger.info(`token: ${token.slice(0, 10)}`);

    // fetch contacts and deals from HubSpot
    const contact = await getHubspotContact("334230687418");
    logger.info(`✅ contact: ${JSON.stringify(contact)}`);

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
    citationIssuedTo = await searchContactByNameInFV(
      getDeal.properties?.citation_issued_to
    );

    /*
    if (!citationIssuedTo && getDeal.properties?.citation_issued_to) {
      // Create payload
      const payload = filevineContactPayload(
        getDeal.properties?.citation_issued_to,
        contact
      );
      // create contact in filevine

      // await hubspotExecutor(
      //   () => hubspotClient.crm.contacts.basicApi.update(contactId, payload),
      //   { contactId }
      // );
      await filevineExecutor(
        () => (citationIssuedTo = createContactInFilevinUsingName(payload)),
        { payload }
      );
      // citationIssuedTo = await createContactInFilevinUsingName(payload);
    }
    logger.info(
      `citation_issued_to: ${JSON.stringify(citationIssuedTo, null, 2)}`
    );

    logger.info(
      `citation_issued_to: ${getDeal.properties?.citation_issued_to}`
    );
    */

    if (getDeal) {
      citationIssuedTo = await searchContactByNameInFV(
        getDeal.properties?.citation_issued_to
      );

      if (!citationIssuedTo && getDeal.properties?.citation_issued_to) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.citation_issued_to,
          contact
        );
        // create contact in filevine
        await filevineExecutor(
          () => (citationIssuedTo = createContactInFilevinUsingName(payload)),
          { payload }
        );
      }

      logger.info(
        `citation_issued_to: ${getDeal.properties?.citation_issued_to}`
      );

      hospitalname = await searchContactByNameInFV(
        getDeal.properties?.hospital_name
      );

      if (!hospitalname && getDeal.properties?.hospital_name) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.hospital_name,
          contact
        );

        // create contact in filevine
        await filevineExecutor(
          () => (hospitalname = createContactInFilevinUsingName(payload)),
          { payload }
        );
        // hospitalname = await createContactInFilevinUsingName(payload);
      }

      logger.info(`hospital_name: ${getDeal.properties?.hospital_name}`);

      // let ambulanceCompanyInformation = null;

      ambulanceCompanyInformation = await searchContactByNameInFV(
        getDeal.properties?.ambulance_type
      );

      if (!ambulanceCompanyInformation && getDeal.properties?.ambulance_type) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.ambulance_type,
          contact
        );

        // create contact in filevine
        await filevineExecutor(
          () =>
            (ambulanceCompanyInformation =
              createContactInFilevinUsingName(payload)),
          { payload }
        );
      }

      logger.info(`ambulance_type: ${getDeal.properties?.ambulance_type}`);

      nameOfProviderSAddPhone = await searchContactByNameInFV(
        getDeal.properties?.name_of_providers
      );

      if (!nameOfProviderSAddPhone && getDeal.properties?.name_of_providers) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.name_of_providers,
          contact
        );

        // create contact in filevine
        await filevineExecutor(
          () =>
            (nameOfProviderSAddPhone =
              createContactInFilevinUsingName(payload)),
          { payload }
        );
      }

      logger.info(
        `nameOfProviderSAddPhone: ${getDeal.properties?.name_of_providers}`
      );
      // TODO: Add filevineExecutor From here
      bodyShop = await searchContactByNameInFV(
        getDeal.properties?.body_shop_type
      );

      if (!bodyShop && getDeal.properties?.body_shop_type) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.body_shop_type,
          contact
        );

        // create contact in filevine
        bodyShop = await createContactInFilevinUsingName(payload);
      }

      logger.info(`body_shop_type: ${getDeal.properties?.body_shop_type}`);

      // let staffMemberSendingPDLetter = null;

      staffMemberSendingPDLetter = await searchContactByNameInFV(
        getDeal.properties?.pd_letter_sent
      );

      if (!staffMemberSendingPDLetter && getDeal.properties?.pd_letter_sent) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.pd_letter_sent,
          contact
        );

        // create contact in filevine
        staffMemberSendingPDLetter = await createContactInFilevinUsingName(
          payload
        );
      }

      logger.info(`pd_letter_sent: ${getDeal.properties?.pd_letter_sent}`);

      // let callercontactfile = null;

      callercontactfile = await searchContactByNameInFV(
        getDeal.properties?.primary_contact
      );

      if (!callercontactfile && getDeal.properties?.primary_contact) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.primary_contact,
          contact
        );

        // create contact in filevine
        callercontactfile = await createContactInFilevinUsingName(payload);
      } // Expecting a phone Number

      logger.info(`primary_contact: ${getDeal.properties?.primary_contact}`);

      // let personperformingintake = null;

      personperformingintake = await searchContactByNameInFV(
        getDeal.properties?.intake_coordinator
      );

      if (!personperformingintake && getDeal.properties?.intake_coordinator) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.intake_coordinator,
          contact
        );
        // create contact in filevine
        personperformingintake = await createContactInFilevinUsingName(payload);
      }

      logger.info(
        `intake_coordinator: ${getDeal.properties?.intake_coordinator}`
      );

      // let spouse = null;

      spouse = await searchContactByNameInFV(getDeal.properties?.spouse_name);

      if (!spouse && getDeal.properties?.spouse_name) {
        // Create payload
        const payload = filevineContactPayload(
          getDeal.properties?.spouse_name,
          contact
        );

        // create contact in filevine
        spouse = await createContactInFilevinUsingName(payload);
      }

      logger.info(`spouse_name: ${getDeal.properties?.spouse_name}`);

      // let defendantSVehicleRegistered = null;

      defendantSVehicleRegistered = await searchContactByNameInFV(
        getDeal.properties?.registered_vehicle_owner
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
        defendantSVehicleRegistered = await createContactInFilevinUsingName(
          payload
        );
      }

      logger.info(
        `registered_vehicle_owner: ${getDeal.properties?.registered_vehicle_owner}`
      );

      // let defendant2DriverContactCar = null;

      defendant2DriverContactCar = await searchContactByNameInFV(
        getDeal.properties?.defendant_2_driver_contact_card
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
        defendant2DriverContactCar = await createContactInFilevinUsingName(
          payload
        );
      }

      logger.info(
        `defendant_2_driver_contact_card: ${getDeal.properties?.defendant_2_driver_contact_card}`
      );

      // let defendant2VehicleRegistered = null;

      defendant2VehicleRegistered = await searchContactByNameInFV(
        getDeal.properties?.defendant_2_vehicle_registered_owner
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
        defendant2VehicleRegistered = await createContactInFilevinUsingName(
          payload
        );
      }

      logger.info(
        `defendant_2_vehicle_registered_owner: ${getDeal.properties?.defendant_2_vehicle_registered_owner}`
      );

      // let defendantDriverContactCard = null;

      defendantDriverContactCard = await searchContactByNameInFV(
        getDeal.properties?.defendant_driver
      );

      if (!defendantDriverContactCard && getDeal.properties?.defendant_driver) {
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

      logger.info(`defendant_driver: ${getDeal.properties?.defendant_driver}`);

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
      filevineContact = await searchContactbyIDInFilevine(sourceId);
      filevinePersonID = filevineContact?.personId?.native || null;
      if (filevineContact) {
        logger.info(`existing Conact in filevine : ${sourceId}`);
      }
      // logger.info(`search contact in filevine: ${filevineContact}`);
    } else {
      // TODO : post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact
      filevineContact = await createContactInFilevine(contact, getDeal);
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
      const project = await createProjectInFilevine(contact, filevinePersonID);
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
