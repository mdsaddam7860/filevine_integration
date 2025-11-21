/**
 * Maps HubSpot contact + deal data to Filevine intake payload
 * @param {Object} contact - HubSpot contact object
 * @param {Object} deal - (Optional) HubSpot deal object
 * @returns {Object} Filevine intake payload
 */
function mapHubspotToFilevine(contact, deal = {}) {
  if (!contact || !contact.properties) {
    throw new Error("Invalid HubSpot contact object");
  }

  const c = contact.properties;
  const d = deal.properties || {};

  const payload = {
    client: {
      lastFirst: c.client_name || "",
      birthDate: c.client_dob || "",
      phones: c.client_phone || "",
      email1: c.client_email || "",
      address1: c.client_address || "",
      driverLicenseNumber: c.drivers_license || "",
    },
    healthInsurancePlan: c.client_health_ins_plan || "",
    healthInsuranceID: c.health_ins_id || "",
    intake: {
      isThisABurgAndBrockCase: c.is_this_a_burg_and_brock_case || "",
      dateOfInterview: c.date_of_interview || "",
      howDidYouHearAboutUs: c.how_did_you_hear_about_us || "",
      language: c.language || "",
      chain990000902Done: c.date_of_incident || "",
      pictures: c.pictures || "",
      AreTheInjuriesSevereYes: c.are_the_injuries_severe || "",
      accidenttype: c.case_type || "",
      didPoliceComeToTheScene: c.did_police_come_to_the_scene || "",
      isThereAPoliceReportSuppo: c.police_report || "",
      policeReportNumber: c.police_report_number || "",
      policeDepartment: c.police_department || "",
      policereportupload: c.police_report_upload || "",
      wereYouDriverOrPassenger: c.were_you_driver_or_passenger || "",
      wasTheCarYouWereInAtFau: c.was_the_car_you_were_in_at_fault || "",
      doYouAndTheDriverShareTh:
        c.do_you_and_the_driver_share_the_same_last_name || "",
      areYouCoveredUnderTheSame: c.are_you_covered_under_the_same_policy || "",
      areYouAndTheDriverRelated: c.are_you_and_the_driver_related || "",
      passenger: c.were_there_other_passengers_in_the_car || "",
      howManyPassengers: c.how_many_passengers || "",
      passengerContactInformation: c.passenger_contact_information || "",
      wasTheOtherPartyUnderThe:
        c.was_the_other_party_under_the_influence_dui || "",
      wasThisAnUberLyftAccident: c.was_this_an_uberlyft_accident || "",
      whichService: c.which_service || "",
      isThereACommercialPolicy: c.is_there_a_commercial_policy || "",
      typeOfAccident: c.type_of_accident || "",
      isThereAWitnessSupporting:
        c.witness_supporting_you_were_not_at_fault || "",
      witnessEs_1: c.witnesses || "",
      leftTurnWereYou: c.left_turn_were_you || "",
      howManyCarsWereInvolved: c.how_many_cars_were_involved || "",
      whatNumberCarWereYouInTh: c.what_number_car_were_you_in_the_chain || "",
      rearEndPedestrianNotes: c.rear_endpedestrian_notes || "",
      approxtimeofincident: c.time_of_incident || "",
      weatherRoadConditions: c.weatherroad_conditions || "",
      approxlocation: c.location_or_cross_streets_of_incident || "",
      incidentcity: c.city || "",
      incidentcounty: c.county || "",
      state: c.state || "",
      trafficControls: c.traffic_controls || "",
      streetClientOn: c.street_client_on || "",
      directionOfTravel: c.direction_of_travel || "",
      laneNumber: c.lane_number || "",
      clientIncidentNotes: c.client_incident_notes || "",
      streetDefendantOn: c.street_defendant_on || "",
      directionOfDefendantsTravel: c.direction_of_defendants_travel || "",
      laneOfDefendant: c.lane_of_defendant || "",
      defendantIncidentNotes: c.defendant_incident_notes || "",
      descriptionofincident: c.incident_description || "",
      citation: c.citation || "",
      citationIssuedToWhom: c.citation_issued_to_whom || "",
      didTheOtherPartyAdmitFaul: c.did_the_other_party_admit_fault || "",
      haveYouDiscussedTheAcciden:
        c.discussed_the_accident_with_your_insurance || "",
      explainWhatWasDiscussed: c.explain_what_was_discussed || "",
      wereYouWorkingAtTheTimeO:
        c.were_you_working_at_the_time_of_the_accident || "",
      doYouHaveAWorkersCompCla: c.do_you_have_a_workers_comp_claim || "",
      whoIsTheWorkerSCompensati:
        c.who_is_the_workers_compensation_attorney || "",
      haveYouTakenAnyTimeOffBe:
        c.taken_any_time_off_because_of_the_accident || "",
      howMuchTime: c.how_many_days_or_hours || "",
      doYouCurrentlyHaveAnAttor:
        c.do_you_currently_have_an_attorney_for_this_case || "",
      attorneySNameAndContactP: c.attorneys_name_and_contact || "",
      doYouIntendToChangeYourA: c.do_you_intend_to_change_your_attorney || "",
      injured: c.were_you_injured || "",
      deathcase: c.death_case || "",
      maritalstatus: c.marital_status || "",
      spouse: c.spouse || "",
      deathspouseinfo: c.name_age_and_health_of_spouse || "",
      children: c.children || "",
      nameAgeOfChildren: c.name_age_of_children || "",
      deathdate: c.date_of_death || "",
      deathcert: c.death_certificate_with_cause_of_death || "",
      deathcause: c.cause_of_death || "",
      deathautopsy: c.was_an_autopsy_performed || "",
      describeinjuries: c.what_injuries_did_you_sustain || "",
      didParamedicsComeToTheSce: c.did_paramedics_come_to_the_scene || "",
      wereYouTransportedByAmbula: c.were_you_transported_by_ambulance || "",
      ambulanceCompanyInformation: c.ambulance_company_information || "",
      didyougotothehospital: c.did_you_go_to_the_hospital || "",
      howLongDidYouStay: c.how_long_did_you_stay || "",
      hospitalName: c.hospital_name || "",
      haveYouReceivedAnyTreatmen: c.have_you_received_any_treatments || "",
      otherTreatmentsYouHaveRece: c.other_treatments_you_have_received || "",
      nameOfProviderSAddPhone: c.name_of_providers || "",
      pastInjuriesAccidents: c.past_injuriesaccidents || "",
      whenWhatHowWhere: c.when_what_how_where || "",
      pcautoins: c.plaintiffs_auto_insurance || "",
      insurance: {
        policyamount: d.policy_amount || c.policy_amount || 0,
      },
      definsco: c.defendant_auto_insurance || "",
      defendantname: c.defendants_names_list_all || "",
      bodyShop: c.body_shop || "",
      staffMemberSendingPDLetter: c.staff_member_sending_pd_letters || "",
      isClientSVehicleDrivable: c.is_clients_vehicle_drivable || "",
      doYouHaveRentalCoverage: c.do_you_have_rental_coverage || "",
      howManyDays: c.how_many_days_rental || "",
      clientSVehicleRegisteredOw: c.clients_vehicle_registered_owner || "",
      clientVehicleMake: c.client_vehicle_make || "",
      clientVehicleModel: c.client_vehicle_model || "",
      clientVehicleYear: c.client_vehicle_year || "",
      clientVehicleLicensePlateNumber:
        c.client_vehicle_license_plate_number || "",
      clientVehicleRepairEstimate: c.client_vehicle_repair_estimate || "",
      defendantDriverContactCard: c.defendant_driver || "",
      defendantSVehicleRegistered: c.defendants_vehicle_registered_owner || "",
      defendantVehicleMake: c.defendant_vehicle_make || "",
      defendantVehicleModel: c.defendant_vehicle_model || "",
      defendantVehicleYear: c.defendant_vehicle_year || "",
      defendantVehicleLicensePl: c.defendant_vehicle_license_plate_number || "",
      defendantVehicleRepairEstim: c.defendant_vehicle_repair_estimate || "",
      additionalDefendantVehicle5:
        c.additional_defendant_vehicle_involved || "",
      numberOfAdditionalVehicleI: c.number_of_additional_vehicle_involved || "",
      defendant2DriverContactCar: c.defendant_2_driver_contact_card || "",
      defendant2VehicleRegistered: c.defendant_2_vehicle_registered_owner || "",
      defendant2VehicleMake: c.defendant_2_vehicle_make || "",
      defendant2VehicleModel: c.defendant_2_vehicle_model || "",
      defendant2VehicleYear: c.defendant_2_vehicle_year || "",
      defendant2VehicleLicense: c.defendant_2_vehicle_license_plate || "",
      defendant2VehicleRepairEst_1: c.defendant_2_vehicle_repair_estimate || "",
      dateofintake: c.date_of_intake || "",
      personperformingintake: c.intake_coordinator || "",
      callercontactfile: c.primary_contact || "",
      intakestatus: c.intake_status || "",
    },
    casesummary: {
      internalFileNumber: c.internal_file_number || "",
    },
  };

  return payload;
}

export { mapHubspotToFilevine };
