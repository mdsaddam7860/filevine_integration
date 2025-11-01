import { hubspotAxios, logger } from "../index.js";

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

export { getContactFromHubspot, updateContactInHubspot };
