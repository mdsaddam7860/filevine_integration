/**
 * Maps HubSpot contact + deal data to Filevine intake payload
 * @param {Object} contact - HubSpot contact object
 * @param {Object} deal - (Optional) HubSpot deal object
 * @returns {Object} Filevine intake payload
 */
// function mapHubspotToFilevine(contact, deal = {}) {
//   if (!contact || !contact.properties) {
//     throw new Error("Invalid HubSpot contact object");
//   }

//   const c = contact.properties;
//   const d = deal.properties || {};

//   const payload = {
//     client: {
//       lastFirst: c.client_name || "",
//       birthDate: c.client_dob || "",
//       phones: c.client_phone || "",
//       email1: c.client_email || "",
//       address1: c.client_address || "",
//       driverLicenseNumber: c.drivers_license || "",
//     },
//     healthInsurancePlan: c.client_health_ins_plan || "",
//     healthInsuranceID: c.health_ins_id || "",
//     intake: {
//       isThisABurgAndBrockCase: c.is_this_a_burg_and_brock_case || "",
//       dateOfInterview: c.date_of_interview || "",
//       howDidYouHearAboutUs: c.how_did_you_hear_about_us || "",
//       language: c.language || "",
//       // chain990000902Done: c.date_of_incident || "",
//       pictures: c.pictures || "",
//       AreTheInjuriesSevereYes: c.are_the_injuries_severe || "",
//       accidenttype: c.case_type || "",
//       didPoliceComeToTheScene: c.did_police_come_to_the_scene || "",
//       isThereAPoliceReportSuppo: c.police_report || "",
//       policeReportNumber: c.police_report_number || "",
//       policeDepartment: c.police_department || "",
//       policereportupload: c.police_report_upload || "",
//       wereYouDriverOrPassenger: c.were_you_driver_or_passenger || "",
//       wasTheCarYouWereInAtFau: c.was_the_car_you_were_in_at_fault || "",
//       doYouAndTheDriverShareTh:
//         c.do_you_and_the_driver_share_the_same_last_name || "",
//       areYouCoveredUnderTheSame: c.are_you_covered_under_the_same_policy || "",
//       areYouAndTheDriverRelated: c.are_you_and_the_driver_related || "",
//       passenger: c.were_there_other_passengers_in_the_car || "",
//       howManyPassengers: c.how_many_passengers || "",
//       passengerContactInformation: c.passenger_contact_information || "",
//       wasTheOtherPartyUnderThe:
//         c.was_the_other_party_under_the_influence_dui || "",
//       wasThisAnUberLyftAccident: c.was_this_an_uberlyft_accident || "",
//       whichService: c.which_service || "",
//       isThereACommercialPolicy: c.is_there_a_commercial_policy || "",
//       typeOfAccident: c.type_of_accident || "",
//       isThereAWitnessSupporting:
//         c.witness_supporting_you_were_not_at_fault || "",
//       witnessEs_1: c.witnesses || "",
//       leftTurnWereYou: c.left_turn_were_you || "",
//       howManyCarsWereInvolved: c.how_many_cars_were_involved || "",
//       whatNumberCarWereYouInTh: c.what_number_car_were_you_in_the_chain || "",
//       rearEndPedestrianNotes: c.rear_endpedestrian_notes || "",
//       approxtimeofincident: c.time_of_incident || "",
//       weatherRoadConditions: c.weatherroad_conditions || "",
//       approxlocation: c.location_or_cross_streets_of_incident || "",
//       incidentcity: c.city || "",
//       incidentcounty: c.county || "",
//       state: c.state || "",
//       trafficControls: c.traffic_controls || "",
//       streetClientOn: c.street_client_on || "",
//       directionOfTravel: c.direction_of_travel || "",
//       laneNumber: c.lane_number || "",
//       clientIncidentNotes: c.client_incident_notes || "",
//       streetDefendantOn: c.street_defendant_on || "",
//       directionOfDefendantsTravel: c.direction_of_defendants_travel || "",
//       laneOfDefendant: c.lane_of_defendant || "",
//       defendantIncidentNotes: c.defendant_incident_notes || "",
//       descriptionofincident: c.incident_description || "",
//       citation: c.citation || "",
//       citationIssuedToWhom: c.citation_issued_to_whom || "",
//       didTheOtherPartyAdmitFaul: c.did_the_other_party_admit_fault || "",
//       haveYouDiscussedTheAcciden:
//         c.discussed_the_accident_with_your_insurance || "",
//       explainWhatWasDiscussed: c.explain_what_was_discussed || "",
//       wereYouWorkingAtTheTimeO:
//         c.were_you_working_at_the_time_of_the_accident || "",
//       doYouHaveAWorkersCompCla: c.do_you_have_a_workers_comp_claim || "",
//       whoIsTheWorkerSCompensati:
//         c.who_is_the_workers_compensation_attorney || "",
//       haveYouTakenAnyTimeOffBe:
//         c.taken_any_time_off_because_of_the_accident || "",
//       howMuchTime: c.how_many_days_or_hours || "",
//       doYouCurrentlyHaveAnAttor:
//         c.do_you_currently_have_an_attorney_for_this_case || "",
//       attorneySNameAndContactP: c.attorneys_name_and_contact || "",
//       doYouIntendToChangeYourA: c.do_you_intend_to_change_your_attorney || "",
//       injured: c.were_you_injured || "",
//       deathcase: c.death_case || "",
//       maritalstatus: c.marital_status || "",
//       spouse: c.spouse || "",
//       deathspouseinfo: c.name_age_and_health_of_spouse || "",
//       children: c.children || "",
//       nameAgeOfChildren: c.name_age_of_children || "",
//       deathdate: c.date_of_death || "",
//       deathcert: c.death_certificate_with_cause_of_death || "",
//       deathcause: c.cause_of_death || "",
//       deathautopsy: c.was_an_autopsy_performed || "",
//       describeinjuries: c.what_injuries_did_you_sustain || "",
//       didParamedicsComeToTheSce: c.did_paramedics_come_to_the_scene || "",
//       wereYouTransportedByAmbula: c.were_you_transported_by_ambulance || "",
//       ambulanceCompanyInformation: c.ambulance_company_information || "",
//       didyougotothehospital: c.did_you_go_to_the_hospital || "",
//       howLongDidYouStay: c.how_long_did_you_stay || "",
//       hospitalName: c.hospital_name || "",
//       haveYouReceivedAnyTreatmen: c.have_you_received_any_treatments || "",
//       otherTreatmentsYouHaveRece: c.other_treatments_you_have_received || "",
//       nameOfProviderSAddPhone: c.name_of_providers || "",
//       pastInjuriesAccidents: c.past_injuriesaccidents || "",
//       whenWhatHowWhere: c.when_what_how_where || "",
//       pcautoins: c.plaintiffs_auto_insurance || "",
//       insurance: {
//         policyamount: d.policy_amount || c.policy_amount || 0,
//       },
//       definsco: c.defendant_auto_insurance || "",
//       defendantname: c.defendants_names_list_all || "",
//       bodyShop: c.body_shop || "",
//       staffMemberSendingPDLetter: c.staff_member_sending_pd_letters || "",
//       isClientSVehicleDrivable: c.is_clients_vehicle_drivable || "",
//       doYouHaveRentalCoverage: c.do_you_have_rental_coverage || "",
//       howManyDays: c.how_many_days_rental || "",
//       clientSVehicleRegisteredOw: c.clients_vehicle_registered_owner || "",
//       clientVehicleMake: c.client_vehicle_make || "",
//       clientVehicleModel: c.client_vehicle_model || "",
//       clientVehicleYear: c.client_vehicle_year || "",
//       clientVehicleLicensePlateNumber:
//         c.client_vehicle_license_plate_number || "",
//       clientVehicleRepairEstimate: c.client_vehicle_repair_estimate || "",
//       defendantDriverContactCard: c.defendant_driver || "",
//       defendantSVehicleRegistered: c.defendants_vehicle_registered_owner || "",
//       defendantVehicleMake: c.defendant_vehicle_make || "",
//       defendantVehicleModel: c.defendant_vehicle_model || "",
//       defendantVehicleYear: c.defendant_vehicle_year || "",
//       defendantVehicleLicensePl: c.defendant_vehicle_license_plate_number || "",
//       defendantVehicleRepairEstim: c.defendant_vehicle_repair_estimate || "",
//       additionalDefendantVehicle5:
//         c.additional_defendant_vehicle_involved || "",
//       numberOfAdditionalVehicleI: c.number_of_additional_vehicle_involved || "",
//       defendant2DriverContactCar: c.defendant_2_driver_contact_card || "",
//       defendant2VehicleRegistered: c.defendant_2_vehicle_registered_owner || "",
//       defendant2VehicleMake: c.defendant_2_vehicle_make || "",
//       defendant2VehicleModel: c.defendant_2_vehicle_model || "",
//       defendant2VehicleYear: c.defendant_2_vehicle_year || "",
//       defendant2VehicleLicense: c.defendant_2_vehicle_license_plate || "",
//       defendant2VehicleRepairEst_1: c.defendant_2_vehicle_repair_estimate || "",
//       dateofintake: c.date_of_intake || "",
//       personperformingintake: c.intake_coordinator || "",
//       // callercontactfile: c.primary_contact || "",
//       intakestatus: c.intake_status || "",
//     },
//     casesummary: {
//       internalFileNumber: c.internal_file_number || "",
//     },
//   };

//   return payload;
// }

// function mapHubspotToFilevine(contact, deal = {}) {
//   if (!contact || !contact.properties) {
//     throw new Error("Invalid HubSpot contact object");
//   }

//   const c = contact.properties;
//   const d = deal.properties || {};

//   const payload = {
//     client: {
//       lastFirst: c.client_name || "",
//       birthDate: c.client_dob || "",
//       phones: c.client_phone || "",
//       email1: c.client_email || "",
//       address1: c.client_address || "",
//       driverLicenseNumber: c.drivers_license || "",
//     },
//     healthInsurancePlan: c.client_health_ins_plan || "",
//     healthInsuranceID: c.health_ins_id || "",
//     intake: {
//       isThisABurgAndBrockCase: c.is_this_a_burg_and_brock_case || "",
//       dateOfInterview: c.date_of_interview || "",
//       howDidYouHearAboutUs: c.how_did_you_hear_about_us || "",
//       language: c.language || "",
//       chain990000902Done: c.date_of_incident || "",
//       pictures: c.pictures || "",
//       AreTheInjuriesSevereYes: c.are_the_injuries_severe || "",
//       accidenttype: c.case_type || "",
//       didPoliceComeToTheScene: c.did_police_come_to_the_scene || "",
//       isThereAPoliceReportSuppo: c.police_report || "",
//       policeReportNumber: c.police_report_number || "",
//       policeDepartment: c.police_department || "",
//       policereportupload: c.police_report_upload || "",
//       wereYouDriverOrPassenger: c.were_you_driver_or_passenger || "",
//       wasTheCarYouWereInAtFau: c.was_the_car_you_were_in_at_fault || "",
//       doYouAndTheDriverShareTh:
//         c.do_you_and_the_driver_share_the_same_last_name || "",
//       areYouCoveredUnderTheSame: c.are_you_covered_under_the_same_policy || "",
//       areYouAndTheDriverRelated: c.are_you_and_the_driver_related || "",
//       passenger: c.were_there_other_passengers_in_the_car || "",
//       howManyPassengers: c.how_many_passengers || "",
//       passengerContactInformation: c.passenger_contact_information || "",
//       wasTheOtherPartyUnderThe:
//         c.was_the_other_party_under_the_influence_dui || "",
//       wasThisAnUberLyftAccident: c.was_this_an_uberlyft_accident || "",
//       whichService: c.which_service || "",
//       isThereACommercialPolicy: c.is_there_a_commercial_policy || "",
//       typeOfAccident: c.type_of_accident || "",
//       isThereAWitnessSupporting:
//         c.witness_supporting_you_were_not_at_fault || "",
//       witnessEs_1: c.witnesses || "",
//       leftTurnWereYou: c.left_turn_were_you || "",
//       howManyCarsWereInvolved: c.how_many_cars_were_involved || "",
//       whatNumberCarWereYouInTh: c.what_number_car_were_you_in_the_chain || "",
//       rearEndPedestrianNotes: c.rear_endpedestrian_notes || "",
//       approxtimeofincident: c.time_of_incident || "",
//       weatherRoadConditions: c.weatherroad_conditions || "",
//       approxlocation: c.location_or_cross_streets_of_incident || "",
//       incidentcity: c.city || "",
//       incidentcounty: c.county || "",
//       state: c.state || "",
//       trafficControls: c.traffic_controls || "",
//       streetClientOn: c.street_client_on || "",
//       directionOfTravel: c.direction_of_travel || "",
//       laneNumber: c.lane_number || "",
//       clientIncidentNotes: c.client_incident_notes || "",
//       streetDefendantOn: c.street_defendant_on || "",
//       directionOfDefendantsTravel: c.direction_of_defendants_travel || "",
//       laneOfDefendant: c.lane_of_defendant || "",
//       defendantIncidentNotes: c.defendant_incident_notes || "",
//       descriptionofincident: c.incident_description || "",
//       citation: c.citation || "",
//       citationIssuedToWhom: c.citation_issued_to_whom || "",
//       didTheOtherPartyAdmitFaul: c.did_the_other_party_admit_fault || "",
//       haveYouDiscussedTheAcciden:
//         c.discussed_the_accident_with_your_insurance || "",
//       explainWhatWasDiscussed: c.explain_what_was_discussed || "",
//       wereYouWorkingAtTheTimeO:
//         c.were_you_working_at_the_time_of_the_accident || "",
//       doYouHaveAWorkersCompCla: c.do_you_have_a_workers_comp_claim || "",
//       whoIsTheWorkerSCompensati:
//         c.who_is_the_workers_compensation_attorney || "",
//       haveYouTakenAnyTimeOffBe:
//         c.taken_any_time_off_because_of_the_accident || "",
//       howMuchTime: c.how_many_days_or_hours || "",
//       doYouCurrentlyHaveAnAttor:
//         c.do_you_currently_have_an_attorney_for_this_case || "",
//       attorneySNameAndContactP: c.attorneys_name_and_contact || "",
//       doYouIntendToChangeYourA: c.do_you_intend_to_change_your_attorney || "",
//       injured: c.were_you_injured || "",
//       deathcase: c.death_case || "",
//       maritalstatus: c.marital_status || "",
//       spouse: c.spouse || "",
//       deathspouseinfo: c.name_age_and_health_of_spouse || "",
//       children: c.children || "",
//       nameAgeOfChildren: c.name_age_of_children || "",
//       deathdate: c.date_of_death || "",
//       deathcert: c.death_certificate_with_cause_of_death || "",
//       deathcause: c.cause_of_death || "",
//       deathautopsy: c.was_an_autopsy_performed || "",
//       describeinjuries: c.what_injuries_did_you_sustain || "",
//       didParamedicsComeToTheSce: c.did_paramedics_come_to_the_scene || "",
//       wereYouTransportedByAmbula: c.were_you_transported_by_ambulance || "",
//       ambulanceCompanyInformation: c.ambulance_company_information || "",
//       didyougotothehospital: c.did_you_go_to_the_hospital || "",
//       howLongDidYouStay: c.how_long_did_you_stay || "",
//       hospitalName: c.hospital_name || "",
//       haveYouReceivedAnyTreatmen: c.have_you_received_any_treatments || "",
//       otherTreatmentsYouHaveRece: c.other_treatments_you_have_received || "",
//       nameOfProviderSAddPhone: c.name_of_providers || "",
//       pastInjuriesAccidents: c.past_injuriesaccidents || "",
//       whenWhatHowWhere: c.when_what_how_where || "",
//       pcautoins: c.plaintiffs_auto_insurance || "",
//       insurance: {
//         policyamount: d.policy_amount || c.policy_amount || 0,
//       },
//       definsco: c.defendant_auto_insurance || "",
//       defendantname: c.defendants_names_list_all || "",
//       bodyShop: c.body_shop || "",
//       staffMemberSendingPDLetter: c.staff_member_sending_pd_letters || "",
//       isClientSVehicleDrivable: c.is_clients_vehicle_drivable || "",
//       doYouHaveRentalCoverage: c.do_you_have_rental_coverage || "",
//       howManyDays: c.how_many_days_rental || "",
//       clientSVehicleRegisteredOw: c.clients_vehicle_registered_owner || "",
//       clientVehicleMake: c.client_vehicle_make || "",
//       clientVehicleModel: c.client_vehicle_model || "",
//       clientVehicleYear: c.client_vehicle_year || "",
//       clientVehicleLicensePlateNumber:
//         c.client_vehicle_license_plate_number || "",
//       clientVehicleRepairEstimate: c.client_vehicle_repair_estimate || "",
//       defendantDriverContactCard: c.defendant_driver || "",
//       defendantSVehicleRegistered: c.defendants_vehicle_registered_owner || "",
//       defendantVehicleMake: c.defendant_vehicle_make || "",
//       defendantVehicleModel: c.defendant_vehicle_model || "",
//       defendantVehicleYear: c.defendant_vehicle_year || "",
//       defendantVehicleLicensePl: c.defendant_vehicle_license_plate_number || "",
//       defendantVehicleRepairEstim: c.defendant_vehicle_repair_estimate || "",
//       additionalDefendantVehicle5:
//         c.additional_defendant_vehicle_involved || "",
//       numberOfAdditionalVehicleI: c.number_of_additional_vehicle_involved || "",
//       defendant2DriverContactCar: c.defendant_2_driver_contact_card || "",
//       defendant2VehicleRegistered: c.defendant_2_vehicle_registered_owner || "",
//       defendant2VehicleMake: c.defendant_2_vehicle_make || "",
//       defendant2VehicleModel: c.defendant_2_vehicle_model || "",
//       defendant2VehicleYear: c.defendant_2_vehicle_year || "",
//       defendant2VehicleLicense: c.defendant_2_vehicle_license_plate || "",
//       defendant2VehicleRepairEst_1: c.defendant_2_vehicle_repair_estimate || "",
//       dateofintake: c.date_of_intake || "",
//       personperformingintake: c.intake_coordinator || "",
//       callercontactfile: c.primary_contact || "",
//       intakestatus: c.intake_status || "",
//     },
//     casesummary: {
//       internalFileNumber: c.internal_file_number || "",
//     },
//   };

//   return payload;
// }

function cleanProps(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

const safe = (v) => {
  const val = cleanValue(v);
  return val === "" || val === undefined || val === null ? null : val;
};
const cleanValue = (v) => {
  if (v === null || v === undefined || v === "") return undefined;
  return v;
  // return typeof v === "string" ? v.trim() : v;
};

function mapHubspotToFilevine(contact, deal = {}) {
  if ((!contact || !contact.properties) && (!deal || !deal.properties)) {
    return {};
  }

  const c = contact.properties || {};
  const d = deal.properties || {};

  // Helper to clean null/undefined/empty and trim strings

  // Flattened intake fields

  // const body = {
  //   isThisABurgAndBrockCase:
  //     c.is_this_a_burg_and_brock_case ||
  //     d.is_this_a_burg_and_brock_case ||
  //     "Yes",
  //   dateOfInterview: c.date_of_interview || d.date_of_interview || "2025-11-19",
  //   howDidYouHearAboutUs:
  //     c.how_did_you_hear_about_us || d.howDidYouHearAboutUs || "Unknown",
  //   language: c.language || d.language || "English",
  //   // chain990000902Done: c.date_of_incident || d.date_of_incident,
  // };

  // return body;

  // const intake = {
  //   isThisABurgAndBrockCase:
  //     cleanValue(d.is_this_a_burg_and_brock_case) ||
  //     cleanValue(c.is_this_a_burg_and_brock_case) ||
  //     "Yes",
  //   dateOfInterview:
  //     cleanValue(d.date_of_interview) ||
  //     cleanValue(c.date_of_interview) ||
  //     "2025-11-19",
  //   howDidYouHearAboutUs:
  //     cleanValue(d.how_did_you_hear_about_us) ||
  //     cleanValue(c.how_did_you_hear_about_us) ||
  //     "Unknown",
  //   language: cleanValue(d.language) || cleanValue(c.language) || "English",
  //   // chain990000902Done: cleanValue(c.date_of_incident), // TODO : ERROR
  //   accidenttype: cleanValue(d.case_type) || cleanValue(c.case_type),
  //   passenger:
  //     cleanValue(d.were_there_other_passengers_in_the_car) ||
  //     cleanValue(c.were_there_other_passengers_in_the_car),
  //   howManyPassengers:
  //     cleanValue(d.how_many_passengers) || cleanValue(c.how_many_passengers),
  //   witnessEs_1: cleanValue(d.witnesses) || cleanValue(c.witnesses),
  //   clientIncidentNotes:
  //     cleanValue(d.client_incident_notes) ||
  //     cleanValue(c.client_incident_notes),
  //   defendantIncidentNotes:
  //     cleanValue(d.defendant_incident_notes) ||
  //     cleanValue(c.defendant_incident_notes),
  //   citationIssuedToWhom:
  //     cleanValue(d.citation_issued_to_whom) ||
  //     cleanValue(c.citation_issued_to_whom),
  //   whoIsTheWorkerSCompensati:
  //     cleanValue(d.who_is_the_workers_compensation_attorney) ||
  //     cleanValue(c.who_is_the_workers_compensation_attorney), // TODO : This needs to be tested and working until this point
  //   attorneySNameAndContactP:
  //     cleanValue(d.attorneys_name_and_contact) ||
  //     cleanValue(c.attorneys_name_and_contact),
  //   deathcase: cleanValue(d.death_case) || cleanValue(c.death_case),
  //   spouse: cleanValue(d.spouse) || cleanValue(c.spouse),
  //   children: cleanValue(d.children) || cleanValue(c.children),
  //   deathdate: cleanValue(d.date_of_death) || cleanValue(c.date_of_death),

  //   deathcert:
  //     cleanValue(d.death_certificate_with_cause_of_death) ||
  //     cleanValue(c.death_certificate_with_cause_of_death),

  //   deathcause: cleanValue(d.cause_of_death) || cleanValue(c.cause_of_death),

  //   ambulanceCompanyInformation:
  //     cleanValue(d.ambulance_company_information) ||
  //     cleanValue(c.ambulance_company_information),

  //   hospitalName: cleanValue(d.hospital_name) || cleanValue(c.hospital_name),

  //   nameOfProviderSAddPhone:
  //     cleanValue(d.name_of_providers) || cleanValue(c.name_of_providers),

  //   // policyAmount:
  //   //   cleanValue(d.policy_amount) || cleanValue(c.policy_amount) || 0, // TODO : ERROR

  //   definsco:
  //     cleanValue(d.defendant_auto_insurance) ||
  //     cleanValue(c.defendant_auto_insurance),
  //   bodyShop: cleanValue(d.body_shop) || cleanValue(c.body_shop),

  //   staffMemberSendingPDLetter:
  //     cleanValue(d.staff_member_sending_pd_letters) ||
  //     cleanValue(c.staff_member_sending_pd_letters),

  //   clientSVehicleRegisteredOw:
  //     cleanValue(d.clients_vehicle_registered_owner) ||
  //     cleanValue(c.clients_vehicle_registered_owner),

  //   clientVehicleMake:
  //     cleanValue(d.client_vehicle_make) || cleanValue(c.client_vehicle_make),
  //   clientVehicleModel:
  //     cleanValue(d.client_vehicle_model) || cleanValue(c.client_vehicle_model),

  //   clientVehicleLicensePlateNumber:
  //     cleanValue(d.client_vehicle_license_plate_number) ||
  //     cleanValue(c.client_vehicle_license_plate_number), // TODO : This needs to be tested and working until this point
  //   // clientVehicleRepairEstimate: cleanValue(c.client_vehicle_repair_estimate), // TODO :ERROR
  //   defendantDriverContactCard:
  //     cleanValue(d.defendant_driver) || cleanValue(c.defendant_driver),
  //   defendantSVehicleRegistered:
  //     cleanValue(d.defendants_vehicle_registered_owner) ||
  //     cleanValue(c.defendants_vehicle_registered_owner),
  //   defendantVehicleLicensePl:
  //     cleanValue(d.defendant_vehicle_license_plate_number) ||
  //     cleanValue(c.defendant_vehicle_license_plate_number),

  //   defendant2DriverContactCar:
  //     cleanValue(d.defendant_2_driver_contact_card) ||
  //     cleanValue(c.defendant_2_driver_contact_card),
  //   defendant2VehicleRegistered:
  //     cleanValue(d.defendant_2_vehicle_registered_owner) ||
  //     cleanValue(c.defendant_2_vehicle_registered_owner),
  //   defendant2VehicleMake:
  //     cleanValue(d.defendant_2_vehicle_make) ||
  //     cleanValue(c.defendant_2_vehicle_make),
  //   defendant2VehicleModel:
  //     cleanValue(d.defendant_2_vehicle_model) ||
  //     cleanValue(c.defendant_2_vehicle_model),
  //   defendant2VehicleLicense:
  //     cleanValue(d.defendant_2_vehicle_license_plate) ||
  //     cleanValue(c.defendant_2_vehicle_license_plate),
  //   defendant2VehicleRepairEst_1:
  //     cleanValue(d.defendant_2_vehicle_repair_estimate) ||
  //     cleanValue(c.defendant_2_vehicle_repair_estimate),
  //   dateofintake: cleanValue(d.date_of_intake) || cleanValue(c.date_of_intake),
  //   // callercontactfile: cleanValue(c.primary_contact), // TODO : ERROR
  //   intakestatus: cleanValue(d.intake_status) || cleanValue(c.intake_status),

  //   // TODO : These fields throwing errors, need to be fixed, from here on down

  //   // Flatten client fields to top-level
  //   // clientLastFirst: cleanValue(c.client_name),
  //   // clientBirthDate: cleanValue(c.client_dob),
  //   // clientPhones: cleanValue(c.client_phone),
  //   // clientEmail1: cleanValue(c.client_email),
  //   // clientAddress1: cleanValue(c.client_address),
  //   // clientDriverLicenseNumber: cleanValue(c.drivers_license),

  //   // TODO : These fields throwing errors, need to be fixed
  //   // // Flatten case summary fields
  //   internalFileNumber:
  //     cleanValue(d.internal_file_number) || cleanValue(c.internal_file_number),
  // };

  const intake = {
    isThisABurgAndBrockCase:
      safe(d.is_this_a_burg_and_brock_case) ??
      safe(c.is_this_a_burg_and_brock_case) ??
      "Yes",

    dateOfInterview:
      safe(d.date_of_interview) ?? safe(c.date_of_interview) ?? "2025-11-19",

    howDidYouHearAboutUs:
      safe(d.how_did_you_hear_about_us) ??
      safe(c.how_did_you_hear_about_us) ??
      "Unknown",

    language: safe(d.language) ?? safe(c.language) ?? "English",

    accidenttype: safe(d.case_type) ?? safe(c.case_type),

    passenger:
      safe(d.were_there_other_passengers_in_the_car) ??
      safe(c.were_there_other_passengers_in_the_car),

    howManyPassengers:
      safe(d.how_many_passengers) ?? safe(c.how_many_passengers),

    witnessEs_1: safe(d.witnesses) ?? safe(c.witnesses),

    clientIncidentNotes:
      safe(d.client_incident_notes) ?? safe(c.client_incident_notes),

    defendantIncidentNotes:
      safe(d.defendant_incident_notes) ?? safe(c.defendant_incident_notes),

    citationIssuedToWhom:
      safe(d.citation_issued_to_whom) ?? safe(c.citation_issued_to_whom),

    whoIsTheWorkerSCompensati:
      safe(d.who_is_the_workers_compensation_attorney) ??
      safe(c.who_is_the_workers_compensation_attorney),

    attorneySNameAndContactP:
      safe(d.attorneys_name_and_contact) ?? safe(c.attorneys_name_and_contact),

    deathcase: safe(d.death_case) ?? safe(c.death_case),

    spouse: safe(d.spouse) ?? safe(c.spouse),

    children: safe(d.children) ?? safe(c.children),

    deathdate: safe(d.date_of_death) ?? safe(c.date_of_death),

    deathcert:
      safe(d.death_certificate_with_cause_of_death) ??
      safe(c.death_certificate_with_cause_of_death),

    deathcause: safe(d.cause_of_death) ?? safe(c.cause_of_death),

    ambulanceCompanyInformation:
      safe(d.ambulance_company_information) ??
      safe(c.ambulance_company_information),

    hospitalName: safe(d.hospital_name) ?? safe(c.hospital_name),

    nameOfProviderSAddPhone:
      safe(d.name_of_providers) ?? safe(c.name_of_providers),

    definsco:
      safe(d.defendant_auto_insurance) ?? safe(c.defendant_auto_insurance),

    bodyShop: safe(d.body_shop) ?? safe(c.body_shop),

    staffMemberSendingPDLetter:
      safe(d.staff_member_sending_pd_letters) ??
      safe(c.staff_member_sending_pd_letters),

    clientSVehicleRegisteredOw:
      safe(d.clients_vehicle_registered_owner) ??
      safe(c.clients_vehicle_registered_owner),

    clientVehicleMake:
      safe(d.client_vehicle_make) ?? safe(c.client_vehicle_make),

    clientVehicleModel:
      safe(d.client_vehicle_model) ?? safe(c.client_vehicle_model),

    clientVehicleLicensePlateNumber:
      safe(d.client_vehicle_license_plate_number) ??
      safe(c.client_vehicle_license_plate_number),

    defendantDriverContactCard:
      safe(d.defendant_driver) ?? safe(c.defendant_driver),

    defendantSVehicleRegistered:
      safe(d.defendants_vehicle_registered_owner) ??
      safe(c.defendants_vehicle_registered_owner),

    defendantVehicleLicensePl:
      safe(d.defendant_vehicle_license_plate_number) ??
      safe(c.defendant_vehicle_license_plate_number),

    defendant2DriverContactCar:
      safe(d.defendant_2_driver_contact_card) ??
      safe(c.defendant_2_driver_contact_card),

    defendant2VehicleRegistered:
      safe(d.defendant_2_vehicle_registered_owner) ??
      safe(c.defendant_2_vehicle_registered_owner),

    defendant2VehicleMake:
      safe(d.defendant_2_vehicle_make) ?? safe(c.defendant_2_vehicle_make),

    defendant2VehicleModel:
      safe(d.defendant_2_vehicle_model) ?? safe(c.defendant_2_vehicle_model),

    defendant2VehicleLicense:
      safe(d.defendant_2_vehicle_license_plate) ??
      safe(c.defendant_2_vehicle_license_plate),

    defendant2VehicleRepairEst_1:
      safe(d.defendant_2_vehicle_repair_estimate) ??
      safe(c.defendant_2_vehicle_repair_estimate),

    dateofintake: safe(d.date_of_intake) ?? safe(c.date_of_intake),

    intakestatus: safe(d.intake_status) ?? safe(c.intake_status),

    internalFileNumber:
      safe(d.internal_file_number) ?? safe(c.internal_file_number),
  };

  return intake;

  // Remove undefined values
  return Object.fromEntries(
    Object.entries(intake).filter(([_, v]) => v !== undefined)
  );
}

export { mapHubspotToFilevine };
