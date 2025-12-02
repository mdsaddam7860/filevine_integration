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

const mapIntakeStatus = (value) => {
  if (!value || typeof value !== "string") return null;

  const lower = value.toLowerCase().trim();

  const map = {
    "approved sign up": "Approved Sign Up*",
    "approved signup": "Approved Sign Up*",
    "no contact": "No Contact/Lost Intake.",
    "no contact/lost intake": "No Contact/Lost Intake.",
    "lost intake": "No Contact/Lost Intake.",
    pending: "Pending.",
    "referred out": "Referred Out*",
    turndown: "Turndown.",
  };

  return map[lower] ?? null; // return Pending if not found
};
const mapMaritalStatus = (value) => {
  if (!value || typeof value !== "string") return null;

  const lower = value.toLowerCase().trim();

  const map = {
    single: "Single",
    married: "Married",
    Divorced: "Divorced",
    widowed: "Widowed",
  };

  return map[lower] ?? null; // return Pending if not found
};
const mapAccidentType = (value) => {
  if (!value || typeof value !== "string") return null;

  // Normalize: lowercase, trim, collapse whitespace, replace hyphens/underscores with space
  const lower = value
    .toLowerCase()
    .trim()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ");

  const map = {
    "auto accident": "Auto Accident",
    "dog bite": "Dog Bite",
    "premise liability": "Premise Liability",
    other: "Other",
  };

  return map[lower] ?? null; // or "Pending"
};

const mapWhichService = (value) => {
  if (!value || typeof value !== "string") return null;

  const lower = value.toLowerCase().trim();

  const map = {
    uber: "Uber",
    lyft: "Lyft",
  };

  return map[lower] ?? null; // return Pending if not found
};
const mapHowDidYouHearAboutUs = (value) => {
  if (!value || typeof value !== "string") return null;

  const lower = value.toLowerCase().trim();

  const map = {
    billboards: "Billboards",
    google: "Google",
    online: "Online",
    other: "Other",

    // Print Media variations
    "print media": "Print media",
    printmedia: "Print media",
    "print-media": "Print media",

    radio: "Radio",

    // Referral variations
    "referred by family": "Referred by family/friends",
    "referred by friends": "Referred by family/friends",
    "referred by family/friends": "Referred by family/friends",

    "referred by treating doctor": "Referred by treating doctor",

    "returning client": "Returning client",

    // Social Media variations
    "social media": "Social Media",
    social_media: "Social Media",
    socialmedia: "Social Media",

    // TV
    "tv commercials": "TV commercials",
    tv_commercials: "TV commercials",
    tvcommercials: "TV commercials",

    yelp: "Yelp",

    // YouTube variations
    "youtube ads": "YouTube ads",
    youtube_ads: "YouTube ads",
    youtube: "YouTube ads",
    "youtube ad": "YouTube ads",
  };

  return map[lower] ?? null;
};

// Test mapWhichService mapping if it is working

function mapHubspotToFilevine(contact, deal = {}) {
  if (!contact || !contact.properties)
    throw new Error("Invalid HubSpot contact");

  const c = contact.properties;
  const d = deal.properties || {};

  // Safe getter: deal first, fallback to contact, then null
  // const get = (dealKey, contactKey) => {
  //   const value = d[dealKey] ?? c[contactKey] ?? null;
  //   if (value === "" || value === undefined) return null;
  //   if (typeof value === "string") {
  //     const lower = value.toLowerCase();
  //     if (lower === "yes") return true;
  //     if (lower === "no") return false;
  //   }
  //   return value;
  // };
  const get = (dealKey, contactKey) => {
    const value = d[dealKey] ?? c[contactKey] ?? null;

    // intake_status mapping
    if (dealKey === "intake_status" || contactKey === "intake_status") {
      return mapIntakeStatus(value);
    }
    // intake_status mapping
    if (dealKey === "which_service" || contactKey === "which_service") {
      return mapWhichService(value);
    }

    // Add maritalstatus mapping
    if (dealKey === "marital_status" || contactKey === "marital_status") {
      return mapMaritalStatus(value);
    }
    // Add mapAccidentType mapping
    if (dealKey === "case_type" || contactKey === "case_type") {
      return mapAccidentType(value);
    }

    // mapHowDidYouHearAboutUs mapping
    if (
      dealKey === "how_did_you_hear_about_us" ||
      contactKey === "how_did_you_hear_about_us"
    ) {
      // return "Social Media";
      return mapHowDidYouHearAboutUs(value);
    }

    if (value === "" || value === undefined) return null;

    // yes → true, no → false
    // if (typeof value === "string") {
    //   const lower = value.toLowerCase();
    //   if (lower === "yes") return true;
    //   if (lower === "no") return false;
    // }

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
    isThisABurgAndBrockCase: getBoolean(
      "is_this_a_burg_and_brock_case",
      "is_this_a_burg_and_brock_case"
    ), // TODO: Update after response
    dateOfInterview: get("date_of_interview", "date_of_interview"),
    language: get("language", "language"),

    pictures: getBoolean("pictures", "pictures"),
    AreTheInjuriesSevereYes: getBoolean(
      "are_the_injuries_severe",
      "are_the_injuries_severe"
    ),

    howDidYouHearAboutUs: get(
      "how_did_you_hear_about_us",
      "how_did_you_hear_about_us"
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
    ),
    witnesses: getBoolean("witnesses", "witnesses"), // TODO Change from witnessEs_1 to witnesses, ask first
    // witnessEs_1: getBoolean("witnesses", "witnesses"),
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
