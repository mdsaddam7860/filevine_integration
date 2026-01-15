import {
  hubspotAxios,
  logger,
  contactProperties,
  dealProperties,
} from "../index.js";
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
  lastSyncDate = null,
  limit = 100,
  maxRetries = 3,
  retryDelay = 1000,
} = {}) {
  let allContacts = [];
  let after = undefined; // pagination cursor

  do {
    let retries = 0;

    if (!lastSyncDate) {
      const oneHourInMs = 60 * 60 * 1000;
      lastSyncDate = new Date().toISOString();
      lastSyncDate = new Date(lastSyncDate).getTime() - oneHourInMs;
    }

    const properties = contactProperties();

    while (retries <= maxRetries) {
      try {
        const requestBody = {
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "hs_lastmodifieddate",
                  operator: "GTE",
                  value: lastSyncDate, // HubSpot expects string
                },
              ],
            },
          ],
          properties: [
            "email",
            "firstname",
            "lastname",
            "sourceid",
            "projectsourceid",
          ],
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

        // TODO remove after testing and add this to getContactFromHubspot
        // return allContacts; // TODO remove after
        logger.info(`✅ Fetched ${allContacts.length} contacts from HubSpot`);

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

async function getDealFromHubspot({
  lastSyncDate = null,
  limit = 100,
  maxRetries = 3,
  retryDelay = 1000,
} = {}) {
  let allDeals = [];
  let after = undefined; // pagination cursor

  try {
    do {
      let retries = 0;

      if (!lastSyncDate) {
        const oneHourInMs = 30 * 60 * 1000; // Delta 30 minutes
        lastSyncDate = new Date().toISOString();
        lastSyncDate = new Date(lastSyncDate).getTime() - oneHourInMs;
      }

      const properties = dealProperties();

      while (retries <= maxRetries) {
        try {
          const requestBody = {
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: "hs_lastmodifieddate",
                    operator: "GTE",
                    value: lastSyncDate,
                  },
                  {
                    propertyName: "trigger_sync_to_filevine",
                    operator: "EQ",
                    value: "true",
                  },
                ],
              },
            ],
            properties,
            limit,
            after,
          };

          // Use the search endpoint for filtering
          const response = await hubspotAxios.post("deals/search", requestBody);

          const deals = response.data?.results || [];
          allDeals.push(...deals);

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
            logger.error("❌ Error in getDealFromHubspot", error);
            return allDeals;
          }
        }
      }
    } while (after);

    // logger.info(`✅ Fetched ${allDeals.length} Deals from HubSpot`);
    return allDeals;
  } catch (error) {
    logger.error("❌ Error in getDealFromHubspot", error);

    return allDeals;
  }
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

    return getContacts.data || null;
    // return getContacts.data?.id || null;
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
async function fetchHubspotDeal(dealId, properties = []) {
  if (!dealId) {
    logger.warn("❌ Error in fetchHubspotDeal: dealId is missing");
    return {};
  }
  try {
    const defaultProperties = dealProperties();

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
    logger.error(
      "❌ HubSpot Deal Fetch Error:",
      err.response?.data || err.message
    );
    return {};
  }
}

async function getHubspotContact(contactId) {
  if (!contactId) {
    logger.warn("❌ Error in getHubspotContact: contactId is missing");
    return null;
  }
  try {
    const url = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
    const properties = contactProperties();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
      params: {
        properties: properties.join(","),
      },
    });

    return response?.data || null;
  } catch (error) {
    logger.error(
      "Error fetching HubSpot contact:",
      error.response?.data || error
    );
    return null;
  }
}

async function updateHubSpotContactProjectId(contactId, projectsourceId) {
  try {
    if (!contactId || !projectsourceId) {
      logger.error("Missing contactId, sourceId");
      return {};
    }

    const payload = {
      properties: {
        projectsourceid: projectsourceId,
      },
    };

    const response = await hubspotAxios.patch(`contacts/${contactId}`, payload);

    logger.info(
      "Contact updated in updateHubSpotContactProjectId:",
      response.data
    );
    return response.data || {};
  } catch (error) {
    logger.error(
      "Error updating HubSpot contact in updateHubSpotContactProjectId:",
      error
    );
    return {};
  }
}

async function getDealIdsForContact(contactId) {
  try {
    const response = await hubspotAxios.get(
      `contacts/${contactId}/associations/deals`,
      {}
    );

    // Extract deal IDs
    // const dealId = response.data.results.map((item) => item.toObjectId);
    const dealId = response.data.results[0].id;

    // logger.info(
    //   `Deal ID:, ${JSON.stringify(response.data.results[0], null, 2)}`
    // );

    // logger.info(`Deal ID:, ${dealId}`);

    return dealId || "";
  } catch (error) {
    logger.error("Error fetching deal IDs:", error.response?.data || error);
    return "";
  }
}
async function getContactIdsForDeal(dealId) {
  if (!dealId) {
    logger.warn("❌ Error in getContactIdsForDeal: dealId is missing");
    return null;
  }
  try {
    const response = await hubspotAxios.get(
      `deals/${dealId}/associations/contacts`,
      {}
    );

    // Extract deal IDs
    // const dealId = response.data.results.map((item) => item.toObjectId);
    const contactId = response.data.results[0].id;

    // logger.info(
    //   `Deal ID:, ${JSON.stringify(response.data.results[0], null, 2)}`
    // );

    logger.info(`Contact ID:, ${contactId}`);

    return contactId || null;
  } catch (error) {
    logger.error("Error fetching deal IDs:", error.response?.data || error);
    return null;
  }
}

async function updateDealInHubspot(dealId, filevine_url = null) {
  try {
    if (!dealId) {
      logger.error("Missing dealId");
      return {};
    }

    const payload = {
      properties: cleanProps({
        filevine_url: filevine_url ? filevine_url : null,
        trigger_sync_to_filevine: false,
      }),
    };

    const response = await hubspotAxios.patch(`deals/${dealId}`, payload);

    return response.data || {};
  } catch (error) {
    logger.error("Error updating HubSpot deal in updateDealInHubspot:", error);
    return null;
  }
}

export {
  updateDealInHubspot,
  getContactIdsForDeal,
  getContactFromHubspot,
  updateContactInHubspot,
  getHubspotContact,
  fetchHubspotDeal,
  updateHubSpotContactProjectId,
  getDealIdsForContact,
  getDealFromHubspot,
};
