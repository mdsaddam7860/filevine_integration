import { hubspotAxios, logger } from "../index.js";
import axios from "axios";

/**
 * Delay helper
 * @param {number} ms milliseconds to wait
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch contacts from HubSpot with filter, paging, retry, and delay
 * @param {Object} options
 * @param {Array} options.filters Array of filter objects: { propertyName, operator, value }
 * @param {number} options.limit Number of records per request (max 100)
 * @param {number} options.maxRetries Max retry attempts for transient errors
 * @param {number} options.retryDelay Base retry delay in ms
 */
async function getContactFromHubspot({
  limit = 100,
  maxRetries = 3,
  retryDelay = 1000,
} = {}) {
  let allContacts = [];
  let after = undefined; // pagination cursor
  // TODO remove after testing

  // const requestBody = {
  //   properties: ["email", "firstname", "lastname", "sourceid"],
  //   limit,
  //   after,
  // };

  // // Use the search endpoint for filtering
  // const response = await hubspotAxios.get("contacts", requestBody);

  // return response.data?.results || [];

  // TODO remove after testing

  do {
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        // filterGroups: filters.length ? [{ filters }] : [],
        const requestBody = {
          properties: ["email", "firstname", "lastname", "sourceid"],
          limit,
          after,
        };

        // Use the search endpoint for filtering
        const response = await hubspotAxios.post(
          "contacts/search",
          requestBody
        );

        const contacts = response.data?.results || [];
        allContacts.push(...contacts);

        after = response.data?.paging?.next?.after; // next cursor
        break; // exit retry loop if successful
      } catch (error) {
        retries++;
        const status = error.response?.status;

        if (status === 429 || (status >= 500 && status < 600)) {
          const waitTime = retryDelay * retries;
          logger.warn(
            `Request failed with status ${status}. Retry ${retries}/${maxRetries} after ${waitTime}ms`
          );
          await delay(waitTime);
        } else {
          logger.error("❌ Error in getContactFromHubspot", error);
          return allContacts;
        }
      }
    }
  } while (after);

  logger.info(`✅ Fetched ${allContacts.length} contacts from HubSpot`);
  return allContacts;
}
// ✅ Utility: removes undefined, null, or empty string values
function cleanProps(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}
async function updateContactInHubspot(contact, id) {
  try {
    if (!contact || !id) {
      logger.info(
        "❌ Error in updateContactInHubspot: contact or id is missing"
      );
      return [];
    }
    const contactDetails = contact.properties;
    // Build base body
    const body = {
      properties: cleanProps({
        sourceid: id,
        firstname: contactDetails.firstname,
        lastname: contactDetails.lastname,
        email: contactDetails.email,
        phone: contactDetails.phone,
      }),
    };
    const getContacts = await hubspotAxios.patch(
      `contacts/${contact.id}`,
      body
    );

    // logger.info(`updateContactInHubspot: ${JSON.stringify(getContacts.data)}`);

    return getContacts.data?.id || null;
  } catch (error) {
    logger.error("❌ Error in updateContactInHubspot", error);
    return [];
  }
}

/**
 * Fetch a HubSpot deal with specific properties
 * @param {string|number} dealId - HubSpot deal ID
 * @param {string} token - HubSpot Private App Token
 * @param {string[]} properties - List of properties to request
 */
async function fetchHubspotDeal(
  dealId = "223721384690",
  token,
  properties = []
) {
  try {
    // If no properties passed, use your full list
    const defaultProperties = [
      "client_name",
      "client_dob",
      "client_phone",
      "client_email",
      "client_address",
      "drivers_license",
      "client_health_ins_plan",
      "health_ins_id",
      "is_this_a_burg_and_brock_case",
      "date_of_interview",
      "how_did_you_hear_about_us",
      "language",
      "date_of_incident",
      "pictures",
      "are_the_injuries_severe",
      "case_type",
      "did_police_come_to_the_scene",
      "police_report",
      "police_report_number",
      "police_department",
      "police_report_upload",
      "were_you_driver_or_passenger",
      "was_the_car_you_were_in_at_fault",
      "do_you_and_the_driver_share_the_same_last_name",
      "are_you_covered_under_the_same_policy",
      "are_you_and_the_driver_related",
      "were_there_other_passengers_in_the_car",
      "how_many_passengers",
      "passenger_contact_information",
      "was_the_other_party_under_the_influence_dui",
      "was_this_an_uberlyft_accident",
      "which_service",
      "is_there_a_commercial_policy",
      "type_of_accident",
      "witness_supporting_you_were_not_at_fault",
      "witnesses",
      "police_report_supporting_you_were_not_at_fault",
      "left_turn_were_you",
      "how_many_cars_were_involved",
      "what_number_car_were_you_in_the_chain",
      "rear_endpedestrian_notes",
      "time_of_incident",
      "weatherroad_conditions",
      "location_or_cross_streets_of_incident",
      "city",
      "county",
      "state",
      "traffic_controls",
      "street_client_on",
      "direction_of_travel",
      "lane_number",
      "client_incident_notes",
      "street_defendant_on",
      "direction_of_defendants_travel",
      "lane_of_defendant",
      "defendant_incident_notes",
      "incident_description",
      "citation",
      "citation_issued_to_whom",
      "did_the_other_party_admit_fault",
      "discussed_the_accident_with_your_insurance",
      "explain_what_was_discussed",
      "were_you_working_at_the_time_of_the_accident",
      "do_you_have_a_workers_comp_claim",
      "who_is_the_workers_compensation_attorney",
      "taken_any_time_off_because_of_the_accident",
      "how_many_days_or_hours",
      "do_you_currently_have_an_attorney_for_this_case",
      "attorneys_name_and_contact",
      "do_you_intend_to_change_your_attorney",
      "were_you_injured",
      "death_case",
      "marital_status",
      "spouse",
      "name_age_and_health_of_spouse",
      "children",
      "name_age_of_children",
      "date_of_death",
      "death_certificate_with_cause_of_death",
      "cause_of_death",
      "was_an_autopsy_performed",
      "what_injuries_did_you_sustain",
      "did_paramedics_come_to_the_scene",
      "were_you_transported_by_ambulance",
      "ambulance_company_information",
      "did_you_go_to_the_hospital",
      "how_long_did_you_stay",
      "hospital_name",
      "have_you_received_any_treatments",
      "other_treatments_you_have_received",
      "name_of_providers",
      "past_injuriesaccidents",
      "when_what_how_where",
      "plaintiffs_auto_insurance",
      "policy_amount",
      "defendant_auto_insurance",
      "defendants_names_list_all",
      "body_shop",
      "staff_member_sending_pd_letters",
      "is_clients_vehicle_drivable",
      "do_you_have_rental_coverage",
      "how_many_days_rental",
      "clients_vehicle_registered_owner",
      "client_vehicle_make",
      "client_vehicle_model",
      "client_vehicle_year",
      "client_vehicle_license_plate_number",
      "client_vehicle_repair_estimate",
      "defendant_driver",
      "defendants_vehicle_registered_owner",
      "defendant_vehicle_make",
      "defendant_vehicle_model",
      "defendant_vehicle_year",
      "defendant_vehicle_license_plate_number",
      "defendant_vehicle_repair_estimate",
      "additional_defendant_vehicle_involved",
      "number_of_additional_vehicle_involved",
      "defendant_2_driver_contact_card",
      "defendant_2_vehicle_registered_owner",
      "defendant_2_vehicle_make",
      "defendant_2_vehicle_model",
      "defendant_2_vehicle_year",
      "defendant_2_vehicle_license_plate",
      "defendant_2_vehicle_repair_estimate",
      "date_of_intake",
      "intake_coordinator",
      "primary_contact",
      "intake_status",
    ];

    const props = properties.length ? properties : defaultProperties;

    const url = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
      params: {
        properties: props.join(","),
      },
    });

    return res.data;
  } catch (err) {
    console.error(
      "❌ HubSpot Deal Fetch Error:",
      err.response?.data || err.message
    );
    throw err;
  }
}

async function getHubspotContact(contactId = "326388247263") {
  // All properties extracted from your cURL call
  const properties = [
    "client_name",
    "client_dob",
    "client_phone",
    "client_email",
    "client_address",
    "drivers_license",
    "client_health_ins_plan",
    "health_ins_id",
    "is_this_a_burg_and_brock_case",
    "date_of_interview",
    "how_did_you_hear_about_us",
    "language",
    "date_of_incident",
    "pictures",
    "are_the_injuries_severe",
    "case_type",
    "did_police_come_to_the_scene",
    "police_report",
    "police_report_number",
    "police_department",
    "police_report_upload",
    "were_you_driver_or_passenger",
    "was_the_car_you_were_in_at_fault",
    "do_you_and_the_driver_share_the_same_last_name",
    "are_you_covered_under_the_same_policy",
    "are_you_and_the_driver_related",
    "were_there_other_passengers_in_the_car",
    "how_many_passengers",
    "passenger_contact_information",
    "was_the_other_party_under_the_influence_dui",
    "was_this_an_uberlyft_accident",
    "which_service",
    "is_there_a_commercial_policy",
    "type_of_accident",
    "witness_supporting_you_were_not_at_fault",
    "witnesses",
    "police_report_supporting_you_were_not_at_fault",
    "left_turn_were_you",
    "how_many_cars_were_involved",
    "what_number_car_were_you_in_the_chain",
    "rear_endpedestrian_notes",
    "time_of_incident",
    "weatherroad_conditions",
    "location_or_cross_streets_of_incident",
    "city",
    "county",
    "state",
    "traffic_controls",
    "street_client_on",
    "direction_of_travel",
    "lane_number",
    "client_incident_notes",
    "street_defendant_on",
    "direction_of_defendants_travel",
    "lane_of_defendant",
    "defendant_incident_notes",
    "incident_description",
    "citation",
    "citation_issued_to_whom",
    "did_the_other_party_admit_fault",
    "discussed_the_accident_with_your_insurance",
    "explain_what_was_discussed",
    "were_you_working_at_the_time_of_the_accident",
    "do_you_have_a_workers_comp_claim",
    "who_is_the_workers_compensation_attorney",
    "taken_any_time_off_because_of_the_accident",
    "how_many_days_or_hours",
    "do_you_currently_have_an_attorney_for_this_case",
    "attorneys_name_and_contact",
    "do_you_intend_to_change_your_attorney",
    "were_you_injured",
    "death_case",
    "marital_status",
    "spouse",
    "name_age_and_health_of_spouse",
    "children",
    "name_age_of_children",
    "date_of_death",
    "death_certificate_with_cause_of_death",
    "cause_of_death",
    "was_an_autopsy_performed",
    "what_injuries_did_you_sustain",
    "did_paramedics_come_to_the_scene",
    "were_you_transported_by_ambulance",
    "ambulance_company_information",
    "did_you_go_to_the_hospital",
    "how_long_did_you_stay",
    "hospital_name",
    "have_you_received_any_treatments",
    "other_treatments_you_have_received",
    "name_of_providers",
    "past_injuriesaccidents",
    "when_what_how_where",
    "plaintiffs_auto_insurance",
    "policy_amount",
    "defendant_auto_insurance",
    "defendants_names_list_all",
    "body_shop",
    "staff_member_sending_pd_letters",
    "is_clients_vehicle_drivable",
    "do_you_have_rental_coverage",
    "how_many_days_rental",
    "clients_vehicle_registered_owner",
    "client_vehicle_make",
    "client_vehicle_model",
    "client_vehicle_year",
    "client_vehicle_license_plate_number",
    "client_vehicle_repair_estimate",
    "defendant_driver",
    "defendants_vehicle_registered_owner",
    "defendant_vehicle_make",
    "defendant_vehicle_model",
    "defendant_vehicle_year",
    "defendant_vehicle_license_plate_number",
    "defendant_vehicle_repair_estimate",
    "additional_defendant_vehicle_involved",
    "number_of_additional_vehicle_involved",
    "defendant_2_driver_contact_card",
    "defendant_2_vehicle_registered_owner",
    "defendant_2_vehicle_make",
    "defendant_2_vehicle_model",
    "defendant_2_vehicle_year",
    "defendant_2_vehicle_license_plate",
    "defendant_2_vehicle_repair_estimate",
    "date_of_intake",
    "intake_coordinator",
    "primary_contact",
    "intake_status",
  ];

  const url = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
      params: {
        properties: properties.join(","),
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching HubSpot contact:",
      error.response?.data || error
    );
    throw error;
  }
}

export {
  getContactFromHubspot,
  updateContactInHubspot,
  getHubspotContact,
  fetchHubspotDeal,
};
