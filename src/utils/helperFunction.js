/**
 * Maps HubSpot contact + deal data to Filevine intake payload
 * @param {Object} contact - HubSpot contact ject
 * @param {Object} deal - (Optional) HubSpot deal object
 * @returns {Object} Filevine intake payload
 */

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

/**
 * Build a Filevine-safe intake update payload
 * using priority: deal > contact > default ("")
 *
 * @param {Object} contact - HubSpot contact object
 * @param {Object} deal - HubSpot deal object
 * @param {Object} intakeSchema - Master schema of ALL Filevine intake fields
 * @returns {Object} - Filevine-friendly update payload
 */

// function mapHubspotToFilevine(contact, deal = {}) {
//   if (!contact || !contact.properties) {
//     throw new Error("Invalid HubSpot contact object");
//   }

//   const c = contact.properties;
//   const d = deal.properties || {};

//   // Safe getter: deal first, fallback to contact, then empty string
//   // const get = (dealKey, contactKey) => d[dealKey] ?? c[contactKey] ?? "";

//   const get = (dealKey, contactKey) => {
//     const value = d[dealKey] ?? c[contactKey] ?? null;

//     if (value === null || value === undefined || value === "") {
//       return null;
//     }

//     if (typeof value === "string") {
//       const lower = value.toLowerCase();
//       if (lower === "yes") return true;
//       if (lower === "no") return false;
//     }

//     return value;
//   };

//   const getBoolean = (dealKey, contactKey) => {
//     const value = d[dealKey] ?? c[contactKey] ?? null;

//     if (value === null || value === undefined || value === "") {
//       return null;
//     }

//     if (typeof value === "string") {
//       const lower = value.toLowerCase();
//       if (lower === "yes" || lower === "true" || lower === true) return "yes";
//       if (lower === "no" || lower === "false" || lower === false) return "no";
//     }

//     return value;
//   };
//   //  some fields are not here like (clientLastFirst: cleanValue(c.client_name))
//   //  some fields are not here like (clientBirthDate: cleanValue(c.client_dob))
//   //  some fields are not here like (clientPhones: cleanValue(c.client_phone))
//   //  some fields are not here like (clientEmail1: cleanValue(c.client_email))
//   //  some fields are not here like (clientAddress1: cleanValue(c.client_address))
//   //  some fields are not here like (clientDriverLicenseNumber: cleanValue(c.drivers_license))
//   const payload = {
//     // client: {
//     //   lastFirst: get("client_name", "client_name"),
//     //   birthDate: get("client_dob", "client_dob"),
//     //   phones: get("client_phone", "client_phone"),
//     //   email1: get("client_email", "client_email"),
//     //   address1: get("client_address", "client_address"),
//     //   driverLicenseNumber: get("drivers_license", "drivers_license"),
//     // },
//     // healthInsurancePlan: get(
//     //   "client_health_ins_plan",
//     //   "client_health_ins_plan"
//     // ),
//     // healthInsuranceID: get("health_ins_id", "health_ins_id"),
//     intake: {
//       isThisABurgAndBrockCase: get(
//         "is_this_a_burg_and_brock_case",
//         "is_this_a_burg_and_brock_case"
//       ),
//       dateOfInterview: get("date_of_interview", "date_of_interview"),
//       howDidYouHearAboutUs: get(
//         "how_did_you_hear_about_us",
//         "how_did_you_hear_about_us"
//       ),
//       language: get("language", "language"),

//       pictures: get("pictures", "pictures"),
//       // chain990000902Done: get("date_of_incident", "date_of_incident"), // 404 error
//       AreTheInjuriesSevereYes: get(
//         "are_the_injuries_severe",
//         "are_the_injuries_severe"
//       ),
//       accidenttype: get("case_type", "case_type"),
//       didPoliceComeToTheScene: get(
//         "did_police_come_to_the_scene",
//         "did_police_come_to_the_scene"
//       ),
//       isThereAPoliceReportSuppo: get("police_report", "police_report"),
//       policeReportNumber: get("police_report_number", "police_report_number"),
//       // policeDepartment: get("police_department", "police_department"), // Contact Card
//       // policereportupload: get("police_report_upload", "police_report_upload"), // Contact Card
//       wereYouDriverOrPassenger: get(
//         "were_you_driver_or_passenger",
//         "were_you_driver_or_passenger"
//       ),
//       wasTheCarYouWereInAtFau: get(
//         "was_the_car_you_were_in_at_fault",
//         "was_the_car_you_were_in_at_fault"
//       ), // Dropdown yes/no , neeed to change true or false
//       doYouAndTheDriverShareTh: get(
//         "do_you_and_the_driver_share_the_same_last_name",
//         "do_you_and_the_driver_share_the_same_last_name"
//       ),
//       areYouCoveredUnderTheSame: get(
//         "are_you_covered_under_the_same_policy",
//         "are_you_covered_under_the_same_policy"
//       ),
//       areYouAndTheDriverRelated: get(
//         "are_you_and_the_driver_related",
//         "are_you_and_the_driver_related"
//       ),
//       passenger: get(
//         "were_there_other_passengers_in_the_car",
//         "were_there_other_passengers_in_the_car"
//       ),
//       howManyPassengers: get("how_many_passengers", "how_many_passengers"),
//       passengerContactInformation: get(
//         "passenger_contact_information",
//         "passenger_contact_information"
//       ),
//       wasTheOtherPartyUnderThe: get(
//         "was_the_other_party_under_the_influence_dui",
//         "was_the_other_party_under_the_influence_dui"
//       ),
//       // wasThisAnUberLyftAccident: get(
//       //   "was_this_an_uberlyft_accident",
//       //   "was_this_an_uberlyft_accident"
//       // ),
//       whichService: get("which_service", "which_service"),
//       // whichService: get("which_service", "which_service"),
//       isThereACommercialPolicy: get(
//         "is_there_a_commercial_policy",
//         "is_there_a_commercial_policy"
//       ),
//       typeOfAccident: get("type_of_accident", "type_of_accident"),
//       isThereAWitnessSupporting: get(
//         "witness_supporting_you_were_not_at_fault",
//         "witness_supporting_you_were_not_at_fault"
//       ),
//       witnessEs_1: get("witnesses", "witnesses"),
//       leftTurnWereYou: get("left_turn_were_you", "left_turn_were_you"),
//       howManyCarsWereInvolved: get(
//         "how_many_cars_were_involved",
//         "how_many_cars_were_involved"
//       ),
//       whatNumberCarWereYouInTh: get(
//         "what_number_car_were_you_in_the_chain",
//         "what_number_car_were_you_in_the_chain"
//       ),
//       rearEndPedestrianNotes: get(
//         "rear_endpedestrian_notes",
//         "rear_endpedestrian_notes"
//       ),
//       approxtimeofincident: get("time_of_incident", "time_of_incident"),
//       weatherRoadConditions: get(
//         "weatherroad_conditions",
//         "weatherroad_conditions"
//       ),
//       approxlocation: get(
//         "location_or_cross_streets_of_incident",
//         "location_or_cross_streets_of_incident"
//       ),
//       incidentcity: get("city", "city"),
//       incidentcounty: get("county", "county"),
//       state: get("state", "state"),
//       trafficControls: get("traffic_controls", "traffic_controls"), // Dropdown yes/no , neeed to change true or false
//       streetClientOn: get("street_client_on", "street_client_on"),
//       directionOfTravel: get("direction_of_travel", "direction_of_travel"),
//       laneNumber: get("lane_number", "lane_number"),
//       clientIncidentNotes: get(
//         "client_incident_notes",
//         "client_incident_notes"
//       ),
//       streetDefendantOn: get("street_defendant_on", "street_defendant_on"),
//       directionOfDefendantsTravel: get("direction_of_defendants_travel", "c"),
//       laneOfDefendant: get("lane_of_defendant", "lane_of_defendant"),
//       defendantIncidentNotes: get(
//         "defendant_incident_notes",
//         "defendant_incident_notes"
//       ),
//       descriptionofincident: get(
//         "incident_description",
//         "incident_description"
//       ),
//       citation: get("citation", "citation"),
//       citationIssuedToWhom: get(
//         "citation_issued_to_whom",
//         "citation_issued_to_whom"
//       ), // Contact Card
//       didTheOtherPartyAdmitFaul: get(
//         "did_the_other_party_admit_fault",
//         "did_the_other_party_admit_fault"
//       ), // Dropdown yes/no , neeed to change true or false
//       haveYouDiscussedTheAcciden: get(
//         "discussed_the_accident_with_your_insurance",
//         "discussed_the_accident_with_your_insurance"
//       ), // TODO Single line text field , sending it in payload but it is not updating , need to be checked
//       explainWhatWasDiscussed: get(
//         "explain_what_was_discussed",
//         "explain_what_was_discussed"
//       ),
//       wereYouWorkingAtTheTimeO: get(
//         "were_you_working_at_the_time_of_the_accident",
//         "were_you_working_at_the_time_of_the_accident"
//       ),
//       doYouHaveAWorkersCompCla: get(
//         "do_you_have_a_workers_comp_claim",
//         "do_you_have_a_workers_comp_claim"
//       ), // Dropdown yes/no , neeed to change true or false
//       whoIsTheWorkerSCompensati: get(
//         "who_is_the_workers_compensation_attorney",
//         "who_is_the_workers_compensation_attorney"
//       ),
//       haveYouTakenAnyTimeOffBe: get(
//         "taken_any_time_off_because_of_the_accident",
//         "taken_any_time_off_because_of_the_accident"
//       ), // Dropdown yes/no , neeed to change true or false
//       howMuchTime: get("how_many_days_or_hours", "how_many_days_or_hours"),
//       doYouCurrentlyHaveAnAttor: get(
//         "do_you_currently_have_an_attorney_for_this_case",
//         "do_you_currently_have_an_attorney_for_this_case"
//       ), // Dropdown yes/no , neeed to change true or false
//       attorneySNameAndContactP: get(
//         "attorneys_name_and_contact",
//         "attorneys_name_and_contact"
//       ),
//       doYouIntendToChangeYourA: get(
//         "do_you_intend_to_change_your_attorney",
//         "do_you_intend_to_change_your_attorney"
//       ), // Dropdown yes/no , neeed to change true or false
//       injured: getBoolean("were_you_injured", "were_you_injured"), // Dropdown true or false , neeed to change yes/no
//       deathcase: get("death_case", "death_case"), // Dropdown yes/no , neeed to change true or false
//       maritalstatus: get("marital_status", "marital_status"),
//       spouse: get("spouse", "spouse"),
//       // spouse: {
//       //   lastFirst: get("spouse", "spouse"),
//       // }, // trying to fix it let see what happens , 500 error
//       deathspouseinfo: get(
//         "name_age_and_health_of_spouse",
//         "name_age_and_health_of_spouse"
//       ),
//       children: get("children", "children"), // Dropdown yes/no , neeed to change true or false
//       nameAgeOfChildren: get("name_age_of_children", "name_age_of_children"), // TODO properly mapped in payload but it is not updating , need to be checked
//       deathdate: get("date_of_death", "date_of_death"),
//       deathcert: get(
//         "death_certificate_with_cause_of_death",
//         "death_certificate_with_cause_of_death"
//       ), // Dropdown yes/no , neeed to change true or false
//       deathcause: get("cause_of_death", "cause_of_death"),
//       deathautopsy: get("was_an_autopsy_performed", "was_an_autopsy_performed"), // Dropdown yes/no , neeed to change true or false
//       describeinjuries: get(
//         "what_injuries_did_you_sustain",
//         "what_injuries_did_you_sustain"
//       ),
//       didParamedicsComeToTheSce: get(
//         "did_paramedics_come_to_the_scene",
//         "did_paramedics_come_to_the_scene"
//       ),
//       wereYouTransportedByAmbula: get(
//         "were_you_transported_by_ambulance",
//         "were_you_transported_by_ambulance"
//       ),
//       // ambulanceCompanyInformation: get(
//       //   "ambulance_company_information",
//       //   "ambulance_company_information"
//       // ), // Contact Card
//       didyougotothehospital: get(
//         "did_you_go_to_the_hospital",
//         "did_you_go_to_the_hospital"
//       ),
//       howLongDidYouStay: get("how_long_did_you_stay", "how_long_did_you_stay"),
//       // hospitalName: get("hospital_name", "hospital_name"), // Contact Card
//       haveYouReceivedAnyTreatmen: get(
//         "have_you_received_any_treatments",
//         "have_you_received_any_treatments"
//       ),
//       otherTreatmentsYouHaveRece: get(
//         "other_treatments_you_have_received",
//         "other_treatments_you_have_received"
//       ),
//       nameOfProviderSAddPhone: get("name_of_providers", "name_of_providers"),
//       pastInjuriesAccidents: get(
//         "past_injuriesaccidents",
//         "past_injuriesaccidents"
//       ),
//       whenWhatHowWhere: get("when_what_how_where", "when_what_how_where"),
//       pcautoins: get("plaintiffs_auto_insurance", "plaintiffs_auto_insurance"),
//       // insurance: {
//       // policyamount: get("policy_amount", "policy_amount") || 0,
//       // }, // TODO : policyAmount will go to insurance object not intake
//       definsco: get("defendant_auto_insurance", "defendant_auto_insurance"),
//       defendantname: get(
//         "defendants_names_list_all",
//         "defendants_names_list_all"
//       ),
//       bodyShop: get("body_shop", "body_shop"), // Contact Card
//       // staffMemberSendingPDLetter: get(
//       //   "staff_member_sending_pd_letters",
//       //   "staff_member_sending_pd_letters"
//       // ), // COntact Card
//       isClientSVehicleDrivable: get(
//         "is_clients_vehicle_drivable",
//         "is_clients_vehicle_drivable"
//       ), // Dropdown yes/no , neeed to change true or false
//       doYouHaveRentalCoverage: get(
//         "do_you_have_rental_coverage",
//         "do_you_have_rental_coverage"
//       ), // Dropdown yes/no , neeed to change true or false
//       howManyDays: get("how_many_days_rental", "how_many_days_rental"),
//       clientSVehicleRegisteredOw: get(
//         "clients_vehicle_registered_owner",
//         "clients_vehicle_registered_owner"
//       ),
//       clientVehicleMake: get("client_vehicle_make", "client_vehicle_make"), // txt
//       clientVehicleModel: get("client_vehicle_model", "client_vehicle_model"), // text
//       clientVehicleYear: get("client_vehicle_year", "client_vehicle_year"), // Number
//       clientVehicleLicensePlateNumber: get(
//         "client_vehicle_license_plate_number",
//         "client_vehicle_license_plate_number"
//       ),
//       clientVehicleRepairEstimate: get(
//         "client_vehicle_repair_estimate",
//         "client_vehicle_repair_estimate"
//       ),
//       defendantDriverContactCard: get("defendant_driver", "defendant_driver"), // Contact Card

//       defendantSVehicleRegistered: get(
//         "defendants_vehicle_registered_owner",
//         "defendants_vehicle_registered_owner"
//       ),
//       defendantVehicleMake: get(
//         "defendant_vehicle_make",
//         "defendant_vehicle_make"
//       ),
//       defendantVehicleModel: get(
//         "defendant_vehicle_model",
//         "defendant_vehicle_model"
//       ),
//       defendantVehicleYear: get(
//         "defendant_vehicle_year",
//         "defendant_vehicle_year"
//       ),
//       defendantVehicleLicensePl: get(
//         "defendant_vehicle_license_plate_number",
//         "defendant_vehicle_license_plate_number"
//       ),
//       defendantVehicleRepairEstim: get(
//         "defendant_vehicle_repair_estimate",
//         "defendant_vehicle_repair_estimate"
//       ),
//       additionalDefendantVehicle5: get(
//         "additional_defendant_vehicle_involved",
//         "additional_defendant_vehicle_involved"
//       ), // Dropdown yes/no , neeed to change true or false
//       numberOfAdditionalVehicleI: get(
//         "number_of_additional_vehicle_involved",
//         "number_of_additional_vehicle_involved"
//       ),
//       defendant2DriverContactCar: get(
//         "defendant_2_driver_contact_card",
//         "defendant_2_driver_contact_card"
//       ), // phone number
//       defendant2VehicleRegistered: get(
//         "defendant_2_vehicle_registered_owner",
//         "defendant_2_vehicle_registered_owner"
//       ),
//       defendant2VehicleMake: get(
//         "defendant_2_vehicle_make",
//         "defendant_2_vehicle_make"
//       ),
//       defendant2VehicleModel: get(
//         "defendant_2_vehicle_model",
//         "defendant_2_vehicle_model"
//       ),
//       defendant2VehicleYear: get(
//         "defendant_2_vehicle_year",
//         "defendant_2_vehicle_year"
//       ), // Number
//       defendant2VehicleLicense: get(
//         "defendant_2_vehicle_license_plate",
//         "defendant_2_vehicle_license_plate"
//       ),
//       defendant2VehicleRepairEst_1: get(
//         "defendant_2_vehicle_repair_estimate",
//         "defendant_2_vehicle_repair_estimate"
//       ), // Number
//       dateofintake: get("date_of_intake", "date_of_intake"), // Date picker
//       // personperformingintake: get("intake_coordinator", "intake_coordinator"), // Contact Card
//       // callercontactfile: get("primary_contact", "primary_contact"), // Contact Card
//       intakestatus: get("intake_status", "intake_status"),
//     },
//     // casesummary: {
//     //   internalFileNumber: get("internal_file_number", "internal_file_number"),
//     // },
//   };

//   return payload.intake;
// }

function mapHubspotToFilevine(contact, deal = {}) {
  if (!contact || !contact.properties)
    throw new Error("Invalid HubSpot contact");

  const c = contact.properties;
  const d = deal.properties || {};

  // Safe getter: deal first, fallback to contact, then null
  const get = (dealKey, contactKey) => {
    const value = d[dealKey] ?? c[contactKey] ?? null;
    if (value === "" || value === undefined) return null;
    if (typeof value === "string") {
      const lower = value.toLowerCase();
      if (lower === "yes") return true;
      if (lower === "no") return false;
    }
    return value;
  };

  // Converts to "yes"/"no" string for Filevine dropdown yes/no fields
  const getYN = (dealKey, contactKey) => {
    const value = get(dealKey, contactKey);
    if (value === null) return null;
    return value === true || value === "true" || value === "Yes" ? "yes" : "no";
  };

  const getBoolean = (dealKey, contactKey) => {
    const value = d[dealKey] ?? c[contactKey] ?? null;
    if (value === null || value === undefined || value === "") return null;

    if (typeof value === "string") {
      const lower = value.toLowerCase();
      if (lower === "yes" || lower === "true") return true;
      if (lower === "no" || lower === "false") return false;
    }

    if (typeof value === "boolean") return value;

    return null; // fallback for unexpected types
  };

  const intake = {
    isThisABurgAndBrockCase: getYN(
      "is_this_a_burg_and_brock_case",
      "is_this_a_burg_and_brock_case"
    ),
    dateOfInterview: get("date_of_interview", "date_of_interview"),
    howDidYouHearAboutUs: get(
      "how_did_you_hear_about_us",
      "how_did_you_hear_about_us"
    ),
    language: get("language", "language"),

    pictures: getBoolean("pictures", "pictures"),
    AreTheInjuriesSevereYes: getBoolean(
      "are_the_injuries_severe",
      "are_the_injuries_severe"
    ),
    accidenttype: get("case_type", "case_type"),
    didPoliceComeToTheScene: getBoolean(
      "did_police_come_to_the_scene",
      "did_police_come_to_the_scene"
    ),
    isThereAPoliceReportSuppo: getBoolean("police_report", "police_report"),
    policeReportNumber: get("police_report_number", "police_report_number"),
    wereYouDriverOrPassenger: get(
      "were_you_driver_or_passenger",
      "were_you_driver_or_passenger"
    ),
    wasTheCarYouWereInAtFau: getBoolean(
      "was_the_car_you_were_in_at_fault",
      "was_the_car_you_were_in_at_fault"
    ), // TODO Changed to boolean
    doYouAndTheDriverShareTh: getBoolean(
      "do_you_and_the_driver_share_the_same_last_name",
      "do_you_and_the_driver_share_the_same_last_name"
    ), // TODO Changed to boolean
    areYouCoveredUnderTheSame: getBoolean(
      "are_you_covered_under_the_same_policy",
      "are_you_covered_under_the_same_policy"
    ), // TODO Changed to boolean
    areYouAndTheDriverRelated: getBoolean(
      "are_you_and_the_driver_related",
      "are_you_and_the_driver_related"
    ), // TODO Changed to boolean
    passenger: getBoolean(
      "were_there_other_passengers_in_the_car",
      "were_there_other_passengers_in_the_car"
    ), // TODO Changed to boolean
    howManyPassengers: get("how_many_passengers", "how_many_passengers"),
    wasTheOtherPartyUnderThe: getBoolean(
      "was_the_other_party_under_the_influence_dui",
      "was_the_other_party_under_the_influence_dui"
    ),
    whichService: get("which_service", "which_service"),
    isThereACommercialPolicy: getBoolean(
      "is_there_a_commercial_policy",
      "is_there_a_commercial_policy"
    ),
    typeOfAccident: get("type_of_accident", "type_of_accident"),
    isThereAWitnessSupporting: getBoolean(
      "witness_supporting_you_were_not_at_fault",
      "witness_supporting_you_were_not_at_fault"
    ), //  TODO start from here
    witnessEs_1: getBoolean("witnesses", "witnesses"),
    // rearEndPedestrianNotes: getBoolean(
    //   "rear_endpedestrian_notes",
    //   "rear_endpedestrian_notes"
    // ),
    approxtimeofincident: get("time_of_incident", "time_of_incident"),
    weatherRoadConditions: get(
      "weatherroad_conditions",
      "weatherroad_conditions"
    ),
    approxlocation: get(
      "location_or_cross_streets_of_incident",
      "location_or_cross_streets_of_incident"
    ),
    incidentcity: get("city", "city"),
    incidentcounty: get("county", "county"),
    state: get("state", "state"),
    trafficControls: getBoolean("traffic_controls", "traffic_controls"),
    streetClientOn: getBoolean("street_client_on", "street_client_on"),
    directionOfTravel: get("direction_of_travel", "direction_of_travel"),
    laneNumber: get("lane_number", "lane_number"),
    clientIncidentNotes: get("client_incident_notes", "client_incident_notes"),
    streetDefendantOn: getBoolean("street_defendant_on", "street_defendant_on"),
    directionOfDefendantsTravel: get(
      "direction_of_defendants_travel",
      "direction_of_defendants_travel"
    ),
    laneOfDefendant: get("lane_of_defendant", "lane_of_defendant"),
    defendantIncidentNotes: get(
      "defendant_incident_notes",
      "defendant_incident_notes"
    ),
    descriptionofincident: get("incident_description", "incident_description"),
    citation: getBoolean("citation", "citation"),
    didTheOtherPartyAdmitFaul: getBoolean(
      "did_the_other_party_admit_fault",
      "did_the_other_party_admit_fault"
    ),
    haveYouDiscussedTheAcciden: get(
      "discussed_the_accident_with_your_insurance",
      "discussed_the_accident_with_your_insurance"
    ),
    explainWhatWasDiscussed: get(
      "explain_what_was_discussed",
      "explain_what_was_discussed"
    ),
    wereYouWorkingAtTheTimeO: getBoolean(
      "were_you_working_at_the_time_of_the_accident",
      "were_you_working_at_the_time_of_the_accident"
    ),
    doYouHaveAWorkersCompCla: getBoolean(
      "do_you_have_a_workers_comp_claim",
      "do_you_have_a_workers_comp_claim"
    ),
    haveYouTakenAnyTimeOffBe: getBoolean(
      "taken_any_time_off_because_of_the_accident",
      "taken_any_time_off_because_of_the_accident"
    ),
    howMuchTime: get("how_many_days_or_hours", "how_many_days_or_hours"),
    doYouCurrentlyHaveAnAttor: getBoolean(
      "do_you_currently_have_an_attorney_for_this_case",
      "do_you_currently_have_an_attorney_for_this_case"
    ),
    doYouIntendToChangeYourA: getBoolean(
      "do_you_intend_to_change_your_attorney",
      "do_you_intend_to_change_your_attorney"
    ),
    injured: getBoolean("were_you_injured", "were_you_injured"),
    deathcase: getBoolean("death_case", "death_case"),
    maritalstatus: get("marital_status", "marital_status"),
    spouse: get("spouse", "spouse"),
    deathspouseinfo: get(
      "name_age_and_health_of_spouse",
      "name_age_and_health_of_spouse"
    ),
    children: getBoolean("children", "children"),
    nameAgeOfChildren: get("name_age_of_children", "name_age_of_children"),
    deathdate: get("date_of_death", "date_of_death"),
    deathcert: getBoolean(
      "death_certificate_with_cause_of_death",
      "death_certificate_with_cause_of_death"
    ),
    deathcause: get("cause_of_death", "cause_of_death"),
    deathautopsy: getBoolean(
      "was_an_autopsy_performed",
      "was_an_autopsy_performed"
    ),
    describeinjuries: get(
      "what_injuries_did_you_sustain",
      "what_injuries_did_you_sustain"
    ),
    didParamedicsComeToTheSce: getBoolean(
      "did_paramedics_come_to_the_scene",
      "did_paramedics_come_to_the_scene"
    ),
    wereYouTransportedByAmbula: getBoolean(
      "were_you_transported_by_ambulance",
      "were_you_transported_by_ambulance"
    ),
    didyougotothehospital: getBoolean(
      "did_you_go_to_the_hospital",
      "did_you_go_to_the_hospital"
    ),
    howLongDidYouStay: get("how_long_did_you_stay", "how_long_did_you_stay"),
    haveYouReceivedAnyTreatmen: getBoolean(
      "have_you_received_any_treatments",
      "have_you_received_any_treatments"
    ),
    otherTreatmentsYouHaveRece: get(
      "other_treatments_you_have_received",
      "other_treatments_you_have_received"
    ),
    nameOfProviderSAddPhone: get("name_of_providers", "name_of_providers"),
    pastInjuriesAccidents: getBoolean(
      "past_injuriesaccidents",
      "past_injuriesaccidents"
    ),
    whenWhatHowWhere: get("when_what_how_where", "when_what_how_where"),
    pcautoins: get("plaintiffs_auto_insurance", "plaintiffs_auto_insurance"),
    definsco: get("defendant_auto_insurance", "defendant_auto_insurance"),
    defendantname: get(
      "defendants_names_list_all",
      "defendants_names_list_all"
    ),
    isClientSVehicleDrivable: getBoolean(
      "is_clients_vehicle_drivable",
      "is_clients_vehicle_drivable"
    ),
    doYouHaveRentalCoverage: getBoolean(
      "do_you_have_rental_coverage",
      "do_you_have_rental_coverage"
    ),
    howManyDays: get("how_many_days_rental", "how_many_days_rental"),
    clientVehicleMake: get("client_vehicle_make", "client_vehicle_make"),
    clientVehicleModel: get("client_vehicle_model", "client_vehicle_model"),
    clientVehicleYear: get("client_vehicle_year", "client_vehicle_year"),
    clientVehicleLicensePlateNumber: get(
      "client_vehicle_license_plate_number",
      "client_vehicle_license_plate_number"
    ),
    clientVehicleRepairEstimate: get(
      "client_vehicle_repair_estimate",
      "client_vehicle_repair_estimate"
    ),
    intakestatus: get("intake_status", "intake_status"),
    dateofintake: get("date_of_intake", "date_of_intake"),
  };

  return intake;
}

export { mapHubspotToFilevine };
