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

function splitFullName(fullName = "") {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: null,
    };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

const cleanValue = (v) => {
  if (v === null || v === undefined || v === "") return undefined;
  return v;
  // return typeof v === "string" ? v.trim() : v;
};

// const mapIntakeStatus = (value) => {
//   if (!value || typeof value !== "string") return null;

//   const lower = value.toLowerCase().trim();

//   const map = {
//     "approved sign up": "Approved Sign Up*",
//     "approved signup": "Approved Sign Up*",
//     "no contact": "No Contact/Lost Intake.",
//     "no contact/lost intake": "No Contact/Lost Intake.",
//     "lost intake": "No Contact/Lost Intake.",
//     pending: "Pending.",
//     "referred out": "Referred Out*",
//     turndown: "Turndown.",
//   };

//   return map[lower] ?? null; // return Pending if not found
// };

const mapIntakeStatus = (value) => {
  if (!value || typeof value !== "string") return null;

  const normalized = value
    .toLowerCase()
    .replace(/\s+/g, " ") // collapse multiple spaces
    .replace(/\s*\/\s*/g, "/") // normalize slashes
    .trim();

  const map = {
    "new lead": "New Lead",
    lead: "New Lead",
    signup: "New Lead",
    "approved sign up": "New Lead",
    "approved signup": "New Lead",

    contacted: "Contacted",
    "initial contact": "Contacted",

    "follow up 1": "Follow up 1",
    "follow up 2": "Follow up 2",
    "follow up 3": "Follow up 3",

    "retainer sent": "Retainer Sent",

    "retainer follow up": "Retainer Follow up",

    "retainer signed": "Retainer signed/ File # assigned",
    "retainer signed/file#assigned": "Retainer signed/ File # assigned",
    "retainer signed/file # assigned": "Retainer signed/ File # assigned",
    "file assigned": "Retainer signed/ File # assigned",

    lost: "Lost",
    "no contact": "Lost",
    "lost intake": "Lost",

    rejected: "Rejected",
    turndown: "Rejected",

    referred: "Referred *",
    "referred out": "Referred *",
  };

  return map[normalized] ?? "Unknown";
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
const mapTypeOfAccident = (value) => {
  if (!value || typeof value !== "string") return null;

  // Normalize input
  const lower = value
    .toLowerCase()
    .trim()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ");

  const map = {
    // direct
    // unknown: "Unknown",
    "lane change": "Lane Change",
    "left turn": "Left Turn",
    "multi car collision": "Multi Car Collision",
    pedestrian: "Pedestrian*",
    "pedestrian*": "Pedestrian*",
    "rear end": "Rear End*",
    "rear end*": "Rear End*",
    "red light": "Red Light",
    "right turn": "Right Turn",
    "stop sign": "Stop Sign",
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

  return map[lower] ?? null; // return null if not found
};

const mapdriverOrPassenger = (value) => {
  if (!value || typeof value !== "string") return null;

  const lower = value.toLowerCase().trim();

  const map = {
    driver: "Driver",
    passenger: "Passenger",
  };

  return map[lower] ?? null; // return null if not found
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

let fvContact = {
  id: 995366203,
  // contactNumber: "995476793",
  // orgID: 6811,
  // firstName: "2",
  // middleName: null,
  // lastName: "Team",
  // fullname: "2 Team",
  // isSingleName: false,
  // fromCompany: "State Farm Ins Company",
  // primaryLanguage: null,
  // orgMetaVersionID: 0,
  // jobTitle: null,
  // department: null,
  // prefix: null,
  // suffix: null,
  // fullnameExtended: "2 Team",
  // nickname: null,
  // initials: "2T",
  // initialsFirstLast: "2T",
  // personTypes: [
  //   {
  //     id: 990000108,
  //     name: "Adjuster",
  //     badgeColorClass: null,
  //     isDeprecated: false,
  //     includeBirthdateField: false,
  //     globalSourceGuid: "a628a714-9847-44b8-a0ab-0e38354eb883",
  //   },
  // ],
  // tags: [],
  // isArchived: false,
  // createdDate: "2024-03-29T15:51:44Z",
  // modifiedDate: "2024-03-29T15:51:44Z",
  // phones: [
  //   {
  //     id: 997165033,
  //     number: "(800) 321-9693 Ext: 1861",
  //     extension: null,
  //     rawNumber: "80032196931861",
  //     isSmsable: false,
  //     isFaxable: false,
  //     label: "Work",
  //     phoneLabel: {
  //       isSmsable: false,
  //       isFaxable: false,
  //       id: 990000052,
  //       name: "Work",
  //       icon: "call",
  //       isDeprecated: false,
  //       globalSourceGuid: "780172ec-8ad4-4ecb-9e48-cd9e251ac42f",
  //     },
  //     notes: "",
  //   },
  //   {
  //     id: 997165034,
  //     number: "(800) 377-0989",
  //     extension: null,
  //     rawNumber: "8003770989",
  //     isSmsable: false,
  //     isFaxable: true,
  //     label: "Fax",
  //     phoneLabel: {
  //       isSmsable: false,
  //       isFaxable: true,
  //       id: 990000051,
  //       name: "Fax",
  //       icon: "call",
  //       isDeprecated: false,
  //       globalSourceGuid: "5989c347-f236-4c32-b43c-3c1c62abe786",
  //     },
  //     notes: "",
  //   },
  // ],
  // emails: [],
  // addresses: [
  //   {
  //     id: 995438739,
  //     line1: "P.O. Box 21659",
  //     line2: null,
  //     line3: null,
  //     city: "Bakersfield",
  //     state: "CA",
  //     zip: "93390",
  //     country: null,
  //     label: "Work",
  //     addressLabel: {
  //       id: 990000022,
  //       name: "Work",
  //       icon: "mail_outline",
  //       isDeprecated: false,
  //       globalSourceGuid: "718c4239-8b78-42b1-b627-13bdda0062b8",
  //     },
  //     notes: null,
  //     fullAddress: "P.O. Box 21659, Bakersfield, CA 93390",
  //   },
  // ],
  // pictureUrl: "",
  // pictureKey: "",
  // birthDate: null,
  // deathDate: null,
  // isDeceased: false,
  // ageInYears: null,
  // uniqueID: "f3ce2ca7-0d77-44a3-b240-c9746547f965",
  // abbreviatedName: null,
  // ssn: null,
  // notes: null,
  // specialty: null,
  // gender: null,
  // language: null,
  // maritalStatus: null,
  // isTextingPermitted: null,
  // remarket: null,
  // driverLicenseNumber: null,
  // isTypeClient: null,
  // isTypeAdjuster: null,
  // isTypeDefendant: false,
  // isTypePlaintiff: false,
  // isTypeAttorney: null,
  // isTypeFirm: null,
  // isTypeExpert: null,
  // isTypeMedicalProvider: null,
  // isTypeInvolvedParty: null,
  // isTypeJudge: null,
  // isTypeCourt: null,
  // isTypeInsuranceCompany: null,
  // salutation: null,
  // barNumber: null,
  // fiduciary: null,
  // isMinor: null,
  // searchNames: ["2", "team", "2 team"],
};

function mapHubspotToFilevine(
  contact = {},
  deal = {},
  citationIssuedTo = {},
  hospitalname = {},
  ambulanceCompanyInformation = {},
  nameOfProviderSAddPhone = {},
  bodyShop = {},
  staffMemberSendingPDLetter = {},
  callercontactfile = {},
  personperformingintake = {},
  spouse = {},
  defendantSVehicleRegistered = {},
  defendant2DriverContactCar = {},
  defendant2VehicleRegistered = {},
  defendantDriverContactCard = {},
  clientSVehicleRegisteredOw = {},
  attorneySNameAndContactP = {},
  whoIsTheWorkerSCompensati = {},
  passengerContactInformation = {},
  witnessEs_1 = {}
) {
  const citationId = citationIssuedTo?.personId?.native || null;
  const hospitalId = hospitalname?.personId?.native || null;
  const ambulanceId = ambulanceCompanyInformation?.personId?.native || null;
  const nameOfProvidersId = nameOfProviderSAddPhone?.personId?.native || null;
  const bodyShopId = bodyShop?.personId?.native || null;
  const staffId = staffMemberSendingPDLetter?.personId?.native || null;
  const callerId = callercontactfile?.personId?.native || null;
  const intakeCoordinatorId = personperformingintake?.personId?.native || null;
  const spouseId = spouse?.personId?.native || null;
  const defendantId = defendantSVehicleRegistered?.personId?.native || null;
  const defendant2DriverId =
    defendant2DriverContactCar?.personId?.native || null;
  const defendant2Id = defendant2VehicleRegistered?.personId?.native || null;
  const defendantDriverId =
    defendantDriverContactCard?.personId?.native || null;
  const clientVehicleRegisteredOwnerId =
    clientSVehicleRegisteredOw?.personId?.native || null;
  const attorneyId = attorneySNameAndContactP?.personId?.native || null;
  const workerCompensationId =
    whoIsTheWorkerSCompensati?.personId?.native || null;
  const passengerId = passengerContactInformation?.personId?.native || null;
  const witnessId = witnessEs_1?.personId?.native || null;

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
    if (
      dealKey === "which_service_uberlyft" ||
      contactKey === "which_service_uberlyft"
    ) {
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
    // Add mapTypeOfAccident mapping
    if (dealKey === "type_of_accident" || contactKey === "type_of_accident") {
      return mapTypeOfAccident(value);
    }
    // Add mapdriverOrPassenger mapping
    if (
      dealKey === "were_you_driver_or_passenger" ||
      contactKey === "were_you_driver_or_passenger"
    ) {
      return mapdriverOrPassenger(value);
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
    ),
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
    ),
    doYouAndTheDriverShareTh: getBoolean(
      "do_you_and_the_driver_share_the_same_last_name",
      "do_you_and_the_driver_share_the_same_last_name"
    ),
    areYouCoveredUnderTheSame: getBoolean(
      "are_you_covered_under_the_same_policy",
      "are_you_covered_under_the_same_policy"
    ),
    areYouAndTheDriverRelated: getBoolean(
      "are_you_and_the_driver_related",
      "are_you_and_the_driver_related"
    ),
    passenger: getBoolean(
      "were_there_other_passengers_in_the_car",
      "were_there_other_passengers_in_the_car"
    ),
    howManyPassengers: get("how_many_passengers", "how_many_passengers"),
    wasTheOtherPartyUnderThe: getBoolean(
      "was_the_other_party_under_the_influence_dui",
      "was_the_other_party_under_the_influence_dui"
    ),
    isThereACommercialPolicy: getBoolean(
      "is_there_a_commercial_policy",
      "is_there_a_commercial_policy"
    ),

    isThereAWitnessSupporting: getBoolean(
      "witness_supporting_you_were_not_at_fault",
      "witness_supporting_you_were_not_at_fault"
    ),
    // witnesses: getBoolean("witnesses", "witnesses"), // TODO Change from witnessEs_1 to witnesses, ask first

    witnessEs_1: [
      {
        id: witnessId,
      },
    ], // Conatct card
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
    state: get("state", "state").toUpperCase(),
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
    laneOfDefendant: get("lane__of_defendant", "lane__of_defendant"),
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
    haveYouDiscussedTheAcciden: getBoolean(
      "discussed_the_accident_with_your_insurance",
      "discussed_the_accident_with_your_insurance"
    ), // TODO Boolean value accepts only true or false
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
    nameOfProviderSAddPhone: [
      {
        id: nameOfProvidersId,
      },
    ],
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
    // clientVehicleMake: get("client_vehicle_make", "client_vehicle_make"),
    // clientVehicleModel: get("client_vehicle_model", "client_vehicle_model"),
    // clientVehicleYear: get("client_vehicle_year", "client_vehicle_year"),
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
    // TODO: Needs to be checked, typeOfAccident is dropdown
    typeOfAccident: get("type_of_accident", "type_of_accident"),
    // typeOfAccident: "Bicycle Accident",
    whichService: get("which_service_uberlyft", "which_service_uberlyft"), // Dropdown
    wasThisAnUberLyftAccident: getBoolean(
      "was_this_an_uberlyft_accident",
      "was_this_an_uberlyft_accident"
    ), // TODO Change from was_this_an_uberlyft_accident to _accident according to recent mapping

    // New Intake Mapping

    hospitalName: [
      {
        id: hospitalId,
      },
    ],
    ambulanceCompanyInformation: [
      {
        id: ambulanceId,
      },
    ],
    // ambulanceCompanyInformation: get(
    //   "ambulance_company_information",
    //   "ambulance_company_information"
    // ), // Contact Card // TODO : Fields are not populated fix later
    // witnessEs_1: get("witnesses", "witnesses"),
    passengerContactInformation: [
      {
        id: passengerId,
      },
    ],

    callercontactfile: {
      id: callerId,
    }, // Contact Card
    personperformingintake: {
      id: intakeCoordinatorId,
    }, // Contact card

    defendant2VehicleRegistered: {
      id: defendant2Id,
    }, // Contact Card

    defendant2DriverContactCar: {
      id: defendant2DriverId,
    }, // contact card

    defendantSVehicleRegistered: {
      id: defendantId,
    }, // Contact Card

    defendantDriverContactCard: {
      id: defendantDriverId,
    }, // Conact Card
    // defendantDriverContactCard: get("defendant_driver", "defendant_driver"), // Conact Card
    clientSVehicleRegisteredOw: {
      id: clientVehicleRegisteredOwnerId,
    }, // Conact Card

    staffMemberSendingPDLetter: {
      id: staffId,
    }, // contact card

    spouse: {
      id: spouseId,
    }, // Contact Card
    bodyShop: {
      id: bodyShopId,
    },

    citationIssuedToWhom: {
      id: citationId,
    },

    // Both throwing 400 errors in Filevine API
    whoIsTheWorkerSCompensati: {
      id: workerCompensationId,
    }, // Contact Card

    attorneySNameAndContactP: {
      id: attorneyId,
    }, // Contact Card

    dateofloss: get("date_of_incident", "date_of_incident"),
    internalFileNumber: get("internal_file_number", "internal_file_number"), // throwing 404 error, //TODO field exist but in (ENTER IN CASE SUMMARY), need to be discussed this is inside case summary
    // policeDepartment: {
    //   id: policeDepartmentId,
    // },

    additionalVehiclesInvolved: getBoolean(
      "additional_defendant_vehicle_involved",
      "additional_defendant_vehicle_involved"
    ),

    clientVehicleMake: get("client_vehicle__make", "client_vehicle__make"),
    clientVehicleModel: get("client_vehicle__model", "client_vehicle__model"),
    clientVehicleYear: get("client_vehicle__year", "client_vehicle__year"),
    defendantVehicleMake: get(
      "defendant_vehicle__make",
      "defendant_vehicle__make"
    ),
    defendantVehicleModel: get(
      "defendant_vehicle__model",
      "defendant_vehicle__model"
    ),
    defendantVehicleYear: get(
      "defendant_vehicle__year",
      "defendant_vehicle__year"
    ),
    defendant2VehicleMake: get(
      "defendant_2_vehicle__make",
      "defendant_2_vehicle__make"
    ),
    defendant2VehicleModel: get(
      "defendant_2_vehicle__model",
      "defendant_2_vehicle__model"
    ),
    defendant2VehicleYear: get(
      "defendant_2_vehicle__year",
      "defendant_2_vehicle__year"
    ),
    defendant2VehicleLicense: get(
      "defendant_2_vehicle__license_plate",
      "defendant_2_vehicle__license_plate"
    ),
    defendant2VehicleRepairEst_1: get(
      "defendant_2_vehicle_repair_estimate",
      "defendant_2_vehicle_repair_estimate"
    ),

    defendantVehicleLicensePl: get(
      "defendant_vehicle__license_plate_number",
      "defendant_vehicle__license_plate_number"
    ),
    defendantVehicleRepairEstim: get(
      "defendant_vehicle_repair_estimate",
      "defendant_vehicle_repair_estimate"
    ),
    leadStatusNotes: get("lead_status_notes", "lead_status_notes"),
  }; // from defendant2VehicleRepairEst_1 to defendant2VehicleRepairEst

  return intake;
}

// function filevineContactPayload(name, contact) {
//   const contactDetails = contact.properties;
//   const trimmedName = name.trim();
//   if (!trimmedName) {
//     logger.warn("Empty name provided for Filevine contact creation");
//     return null;
//   }

//   const { firstName, lastName } = splitFullName(trimmedName);

//   // -----------------------------------
//   // Filevine requires full name
//   // -----------------------------------
//   if (!firstName || !lastName) {
//     logger.warn(
//       `Cannot create Filevine contact without full name: "${trimmedName}"`
//     );
//     return null;
//   }

//   const payload = {
//     firstName,
//     lastName,
//     // Phones: [
//     //   {
//     //     PhoneId: {
//     //       Native: -2147483648,
//     //       Partner: null,
//     //     },
//     //     Links: {},
//     //     Number: contactDetails?.phone,
//     //     RawNumber: contactDetails?.phone,
//     //     // Extension: "string",
//     //     Label: "Primary",
//     //     IsSmsable: true,
//     //     IsFaxable: true,
//     //   },
//     // ],
//     Emails: [
//       {
//         EmailId: {
//           Native: -2147483648, // use -2147483648 for new emails as per Filevine docs
//           Partner: null,
//         },
//         Links: {}, // can be empty if no custom links
//         Address: contactDetails?.email, // your actual email string
//         Label: "Primary", // label can be Primary, Work, Home, etc.
//       },
//     ],
//     // Addresses: [
//     //   {
//     //     AddressId: {
//     //       Native: -2147483648,
//     //       Partner: null,
//     //     },
//     //     Links: {},
//     //     Line1: "string",
//     //     Line2: "string",
//     //     Line3: "string",
//     //     City: contactDetails?.city,
//     //     State: contactDetails?.state,
//     //     PostalCode: contactDetails?.zip,
//     //     Country: contactDetails?.country,
//     //     Label: "string",
//     //     FullAddress: contactDetails?.address,
//     //   },
//     // ],
//   };

//   return payload;
// }
function filevineContactPayload(name, contact) {
  const contactDetails = contact.properties;
  const trimmedName = name.trim();
  if (!trimmedName) return null;

  const { firstName, lastName } = splitFullName(trimmedName);
  if (!firstName || !lastName) return null;

  return {
    FirstName: firstName,
    LastName: lastName,

    PersonTypes: ["Person"],

    Phones: contactDetails?.phone
      ? [
          {
            PhoneId: {
              Native: -2147483648,
              Partner: null,
            },
            Number: contactDetails.phone,
            RawNumber: contactDetails.phone,
            Label: "Primary",
            IsSmsable: true,
            IsFaxable: false,
          },
        ]
      : [],

    Emails: contactDetails?.email
      ? [
          {
            EmailId: {
              Native: -2147483648,
              Partner: null,
            },
            Address: contactDetails.email,
            Label: "Primary",
          },
        ]
      : [],

    Addresses: contactDetails?.address
      ? [
          {
            AddressId: {
              Native: -2147483648,
              Partner: null,
            },
            Line1: contactDetails.address,
            City: contactDetails?.city ?? null,
            State: contactDetails?.state ?? null,
            PostalCode: contactDetails?.zip ?? null,
            Country: contactDetails?.country ?? null,
            Label: "Primary",
          },
        ]
      : [],
  };
}

export { mapHubspotToFilevine, splitFullName, filevineContactPayload };
("");
