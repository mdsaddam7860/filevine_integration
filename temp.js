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

// function mapHubspotToFilevine(contact, deal = {}) {
//   if ((!contact || !contact.properties) && (!deal || !deal.properties)) {
//     return {};
//   }

//   const c = contact.properties || {};
//   const d = deal.properties || {};

//   // Helper to clean null/undefined/empty and trim strings

//   // Flattened intake fields

//   // const body = {
//   //   isThisABurgAndBrockCase:
//   //     c.is_this_a_burg_and_brock_case ||
//   //     d.is_this_a_burg_and_brock_case ||
//   //     "Yes",
//   //   dateOfInterview: c.date_of_interview || d.date_of_interview || "2025-11-19",
//   //   howDidYouHearAboutUs:
//   //     c.how_did_you_hear_about_us || d.howDidYouHearAboutUs || "Unknown",
//   //   language: c.language || d.language || "English",
//   //   // chain990000902Done: c.date_of_incident || d.date_of_incident,
//   // };

//   // return body;

//   // const intake = {
//   //   isThisABurgAndBrockCase:
//   //     cleanValue(d.is_this_a_burg_and_brock_case) ||
//   //     cleanValue(c.is_this_a_burg_and_brock_case) ||
//   //     "Yes",
//   //   dateOfInterview:
//   //     cleanValue(d.date_of_interview) ||
//   //     cleanValue(c.date_of_interview) ||
//   //     "2025-11-19",
//   //   howDidYouHearAboutUs:
//   //     cleanValue(d.how_did_you_hear_about_us) ||
//   //     cleanValue(c.how_did_you_hear_about_us) ||
//   //     "Unknown",
//   //   language: cleanValue(d.language) || cleanValue(c.language) || "English",
//   //   // chain990000902Done: cleanValue(c.date_of_incident), // TODO : ERROR
//   //   accidenttype: cleanValue(d.case_type) || cleanValue(c.case_type),
//   //   passenger:
//   //     cleanValue(d.were_there_other_passengers_in_the_car) ||
//   //     cleanValue(c.were_there_other_passengers_in_the_car),
//   //   howManyPassengers:
//   //     cleanValue(d.how_many_passengers) || cleanValue(c.how_many_passengers),
//   //   witnessEs_1: cleanValue(d.witnesses) || cleanValue(c.witnesses),
//   //   clientIncidentNotes:
//   //     cleanValue(d.client_incident_notes) ||
//   //     cleanValue(c.client_incident_notes),
//   //   defendantIncidentNotes:
//   //     cleanValue(d.defendant_incident_notes) ||
//   //     cleanValue(c.defendant_incident_notes),
//   //   citationIssuedToWhom:
//   //     cleanValue(d.citation_issued_to_whom) ||
//   //     cleanValue(c.citation_issued_to_whom),
//   //   whoIsTheWorkerSCompensati:
//   //     cleanValue(d.who_is_the_workers_compensation_attorney) ||
//   //     cleanValue(c.who_is_the_workers_compensation_attorney), // TODO : This needs to be tested and working until this point
//   //   attorneySNameAndContactP:
//   //     cleanValue(d.attorneys_name_and_contact) ||
//   //     cleanValue(c.attorneys_name_and_contact),
//   //   deathcase: cleanValue(d.death_case) || cleanValue(c.death_case),
//   //   spouse: cleanValue(d.spouse) || cleanValue(c.spouse),
//   //   children: cleanValue(d.children) || cleanValue(c.children),
//   //   deathdate: cleanValue(d.date_of_death) || cleanValue(c.date_of_death),

//   //   deathcert:
//   //     cleanValue(d.death_certificate_with_cause_of_death) ||
//   //     cleanValue(c.death_certificate_with_cause_of_death),

//   //   deathcause: cleanValue(d.cause_of_death) || cleanValue(c.cause_of_death),

//   //   ambulanceCompanyInformation:
//   //     cleanValue(d.ambulance_company_information) ||
//   //     cleanValue(c.ambulance_company_information),

//   //   hospitalName: cleanValue(d.hospital_name) || cleanValue(c.hospital_name),

//   //   nameOfProviderSAddPhone:
//   //     cleanValue(d.name_of_providers) || cleanValue(c.name_of_providers),

//   //   // policyAmount:
//   //   //   cleanValue(d.policy_amount) || cleanValue(c.policy_amount) || 0, // TODO : ERROR

//   //   definsco:
//   //     cleanValue(d.defendant_auto_insurance) ||
//   //     cleanValue(c.defendant_auto_insurance),
//   //   bodyShop: cleanValue(d.body_shop) || cleanValue(c.body_shop),

//   //   staffMemberSendingPDLetter:
//   //     cleanValue(d.staff_member_sending_pd_letters) ||
//   //     cleanValue(c.staff_member_sending_pd_letters),

//   //   clientSVehicleRegisteredOw:
//   //     cleanValue(d.clients_vehicle_registered_owner) ||
//   //     cleanValue(c.clients_vehicle_registered_owner),

//   //   clientVehicleMake:
//   //     cleanValue(d.client_vehicle_make) || cleanValue(c.client_vehicle_make),
//   //   clientVehicleModel:
//   //     cleanValue(d.client_vehicle_model) || cleanValue(c.client_vehicle_model),

//   //   clientVehicleLicensePlateNumber:
//   //     cleanValue(d.client_vehicle_license_plate_number) ||
//   //     cleanValue(c.client_vehicle_license_plate_number), // TODO : This needs to be tested and working until this point
//   //   // clientVehicleRepairEstimate: cleanValue(c.client_vehicle_repair_estimate), // TODO :ERROR
//   //   defendantDriverContactCard:
//   //     cleanValue(d.defendant_driver) || cleanValue(c.defendant_driver),
//   //   defendantSVehicleRegistered:
//   //     cleanValue(d.defendants_vehicle_registered_owner) ||
//   //     cleanValue(c.defendants_vehicle_registered_owner),
//   //   defendantVehicleLicensePl:
//   //     cleanValue(d.defendant_vehicle_license_plate_number) ||
//   //     cleanValue(c.defendant_vehicle_license_plate_number),

//   //   defendant2DriverContactCar:
//   //     cleanValue(d.defendant_2_driver_contact_card) ||
//   //     cleanValue(c.defendant_2_driver_contact_card),
//   //   defendant2VehicleRegistered:
//   //     cleanValue(d.defendant_2_vehicle_registered_owner) ||
//   //     cleanValue(c.defendant_2_vehicle_registered_owner),
//   //   defendant2VehicleMake:
//   //     cleanValue(d.defendant_2_vehicle_make) ||
//   //     cleanValue(c.defendant_2_vehicle_make),
//   //   defendant2VehicleModel:
//   //     cleanValue(d.defendant_2_vehicle_model) ||
//   //     cleanValue(c.defendant_2_vehicle_model),
//   //   defendant2VehicleLicense:
//   //     cleanValue(d.defendant_2_vehicle_license_plate) ||
//   //     cleanValue(c.defendant_2_vehicle_license_plate),
//   //   defendant2VehicleRepairEst_1:
//   //     cleanValue(d.defendant_2_vehicle_repair_estimate) ||
//   //     cleanValue(c.defendant_2_vehicle_repair_estimate),
//   //   dateofintake: cleanValue(d.date_of_intake) || cleanValue(c.date_of_intake),
//   //   // callercontactfile: cleanValue(c.primary_contact), // TODO : ERROR
//   //   intakestatus: cleanValue(d.intake_status) || cleanValue(c.intake_status),

//   //   // TODO : These fields throwing errors, need to be fixed, from here on down

//   //   // Flatten client fields to top-level
//   //   // clientLastFirst: cleanValue(c.client_name),
//   //   // clientBirthDate: cleanValue(c.client_dob),
//   //   // clientPhones: cleanValue(c.client_phone),
//   //   // clientEmail1: cleanValue(c.client_email),
//   //   // clientAddress1: cleanValue(c.client_address),
//   //   // clientDriverLicenseNumber: cleanValue(c.drivers_license),

//   //   // TODO : These fields throwing errors, need to be fixed
//   //   // // Flatten case summary fields
//   //   internalFileNumber:
//   //     cleanValue(d.internal_file_number) || cleanValue(c.internal_file_number),
//   // };

//   const intake = {
//     isThisABurgAndBrockCase:
//       safe(d.is_this_a_burg_and_brock_case) ??
//       safe(c.is_this_a_burg_and_brock_case) ??
//       "Yes",

//     dateOfInterview:
//       safe(d.date_of_interview) ?? safe(c.date_of_interview) ?? "2025-11-19",

//     howDidYouHearAboutUs:
//       safe(d.how_did_you_hear_about_us) ??
//       safe(c.how_did_you_hear_about_us) ??
//       "Unknown",

//     language: safe(d.language) ?? safe(c.language) ?? "English",

//     accidenttype: safe(d.case_type) ?? safe(c.case_type),

//     passenger:
//       safe(d.were_there_other_passengers_in_the_car) ??
//       safe(c.were_there_other_passengers_in_the_car),

//     howManyPassengers:
//       safe(d.how_many_passengers) ?? safe(c.how_many_passengers),

//     witnessEs_1: safe(d.witnesses) ?? safe(c.witnesses),

//     clientIncidentNotes:
//       safe(d.client_incident_notes) ?? safe(c.client_incident_notes),

//     defendantIncidentNotes:
//       safe(d.defendant_incident_notes) ?? safe(c.defendant_incident_notes),

//     citationIssuedToWhom:
//       safe(d.citation_issued_to_whom) ?? safe(c.citation_issued_to_whom),

//     whoIsTheWorkerSCompensati:
//       safe(d.who_is_the_workers_compensation_attorney) ??
//       safe(c.who_is_the_workers_compensation_attorney),

//     attorneySNameAndContactP:
//       safe(d.attorneys_name_and_contact) ?? safe(c.attorneys_name_and_contact),

//     deathcase: safe(d.death_case) ?? safe(c.death_case),

//     spouse: safe(d.spouse) ?? safe(c.spouse),

//     children: safe(d.children) ?? safe(c.children),

//     deathdate: safe(d.date_of_death) ?? safe(c.date_of_death),

//     deathcert:
//       safe(d.death_certificate_with_cause_of_death) ??
//       safe(c.death_certificate_with_cause_of_death),

//     deathcause: safe(d.cause_of_death) ?? safe(c.cause_of_death),

//     ambulanceCompanyInformation:
//       safe(d.ambulance_company_information) ??
//       safe(c.ambulance_company_information),

//     hospitalName: safe(d.hospital_name) ?? safe(c.hospital_name),

//     nameOfProviderSAddPhone:
//       safe(d.name_of_providers) ?? safe(c.name_of_providers),

//     definsco:
//       safe(d.defendant_auto_insurance) ?? safe(c.defendant_auto_insurance),

//     bodyShop: safe(d.body_shop) ?? safe(c.body_shop),

//     staffMemberSendingPDLetter:
//       safe(d.staff_member_sending_pd_letters) ??
//       safe(c.staff_member_sending_pd_letters),

//     clientSVehicleRegisteredOw:
//       safe(d.clients_vehicle_registered_owner) ??
//       safe(c.clients_vehicle_registered_owner),

//     clientVehicleMake:
//       safe(d.client_vehicle_make) ?? safe(c.client_vehicle_make),

//     clientVehicleModel:
//       safe(d.client_vehicle_model) ?? safe(c.client_vehicle_model),

//     clientVehicleLicensePlateNumber:
//       safe(d.client_vehicle_license_plate_number) ??
//       safe(c.client_vehicle_license_plate_number),

//     defendantDriverContactCard:
//       safe(d.defendant_driver) ?? safe(c.defendant_driver),

//     defendantSVehicleRegistered:
//       safe(d.defendants_vehicle_registered_owner) ??
//       safe(c.defendants_vehicle_registered_owner),

//     defendantVehicleLicensePl:
//       safe(d.defendant_vehicle_license_plate_number) ??
//       safe(c.defendant_vehicle_license_plate_number),

//     defendant2DriverContactCar:
//       safe(d.defendant_2_driver_contact_card) ??
//       safe(c.defendant_2_driver_contact_card),

//     defendant2VehicleRegistered:
//       safe(d.defendant_2_vehicle_registered_owner) ??
//       safe(c.defendant_2_vehicle_registered_owner),

//     defendant2VehicleMake:
//       safe(d.defendant_2_vehicle_make) ?? safe(c.defendant_2_vehicle_make),

//     defendant2VehicleModel:
//       safe(d.defendant_2_vehicle_model) ?? safe(c.defendant_2_vehicle_model),

//     defendant2VehicleLicense:
//       safe(d.defendant_2_vehicle_license_plate) ??
//       safe(c.defendant_2_vehicle_license_plate),

//     defendant2VehicleRepairEst_1:
//       safe(d.defendant_2_vehicle_repair_estimate) ??
//       safe(c.defendant_2_vehicle_repair_estimate),

//     dateofintake: safe(d.date_of_intake) ?? safe(c.date_of_intake),

//     intakestatus: safe(d.intake_status) ?? safe(c.intake_status),

//     internalFileNumber:
//       safe(d.internal_file_number) ?? safe(c.internal_file_number),
//   };

//   return intake;

//   // Remove undefined values
//   return Object.fromEntries(
//     Object.entries(intake).filter(([_, v]) => v !== undefined)
//   );
// }

// function buildFilevineIntakeUpdate(contact, deal, intakeSchema) {
//   // safety cleaner
//   const safe = (v) =>
//     v === undefined || v === null || v === "" ? "" : String(v).trim();

//   // Final nested result as Filevine expects
//   const intake = {};

//   // Loop over ALL keys defined in your 120-field schema
//   for (const fieldKey of Object.keys(intakeSchema)) {
//     const schemaField = intakeSchema[fieldKey]; // reference field definition

//     // Priority order: deal → contact → default
//     const valueFromDeal =
//       deal?.properties?.[schemaField.dealField] ??
//       deal?.[schemaField.dealField];

//     const valueFromContact =
//       contact?.properties?.[schemaField.contactField] ??
//       contact?.[schemaField.contactField];

//     intake[fieldKey] = safe(
//       valueFromDeal ?? valueFromContact ?? schemaField.default ?? ""
//     );
//   }

//   // MUST return nested structure for Filevine
//   return { intake };
// }

// ----------------------------------
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

try {
  app.listen(PORT, async () => {
    // if (process.env.LOGGER_ENV === "development") {
    // }
    // hubspotToFilevine();

    // https://app-na2.hubspot.com/contacts/242315905/record/0-3/228252098235

    /*  
  //     https://app-na2.hubspot.com/contacts/242315905/record/0-3/228252098235/ - this is deal record
  // it has this contact associated - https://app-na2.hubspot.com/contacts/242315905/record/0-1/334230687418
  
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
        // TODO: check this
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
      } // TODO : end of else
  
      // update contact in FV here
      if (filevineContact) {
        const updateContact = await updateContactInFilevine(
          filevineContact.personId.native,
          contact
        );
  
        logger.info(
          `Updated Contact in Filevine: ${JSON.stringify(updateContact, null, 2)}`
        );
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
      logger.info(`✅ updatedIntake: ${JSON.stringify(updatedIntake)}`);
  
      // TODO : remove this in production
      */

    logger.info(`Server is running on port ${PORT}`);
    // console.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  logger.error(`Error in starting server`, error);
}
