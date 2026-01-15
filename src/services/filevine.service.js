import {
  AxiosFilevine,
  logger,
  AxiosFilevineAuth,
  splitFullName,
  filevineTokenManager,
} from "../index.js";
import qs from "qs";
import util from "util";

async function getTokenFromFilevine() {
  try {
    let data = qs.stringify({
      client_id: process.env.FILEVINE_CLIENT_ID,
      client_secret: process.env.FILEVINE_CLIENT_SECRET,
      grant_type: "personal_access_token",
      token: process.env.FILEVINE_TOKEN,
      scope:
        "fv.api.gateway.access tenant filevine.v2.api.* openid email fv.auth.tenant.read",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://identity.filevine.com/connect/token",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    const getToken = await AxiosFilevine.post("connect/token", data);

    // logger.info(
    //   `Request data being sent to Filevine:, ${getToken.data?.access_token}`
    // );

    return getToken.data?.access_token;
  } catch (error) {
    logger.error("Error in getting token from Filevine:", error);

    return null;
  }
}

async function searchContactbyIDInFilevine(id) {
  try {
    const token = await filevineTokenManager.getToken();
    if (!id || !token) {
      return null;
    }

    let data = JSON.stringify({
      ProjectTypeId: {
        Native: "990000083",
      },
      ClientId: {
        Native: "996817830",
      },
      ProjectName: "tessss",
    });

    const axiosFilevine = AxiosFilevineAuth(token);

    const res = await axiosFilevine.get(`fv-app/v2/Contacts/${id}`, data);

    // logger.info(
    //   `Request data received from Filevine: ${util.inspect(res, {
    //     depth: 2,
    //   })}`
    // );

    return res?.data || {};
  } catch (error) {
    logger.error("Error in searching contact by ID in Filevine:", error);
    return {};
  }
}

async function searchContactByNameInFV(name) {
  try {
    const token = await filevineTokenManager.getToken();
    // -----------------------------------
    // Validate inputs FIRST
    // -----------------------------------
    if (!token || !name || typeof name !== "string") {
      logger.warn("Name and token are required for searching contact");
      return null;
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      logger.warn("Empty name provided for Filevine contact search");
      return null;
    }

    const { firstName, lastName } = splitFullName(trimmedName);

    // -----------------------------------
    // Filevine requires BOTH names
    // -----------------------------------
    if (!firstName || !lastName) {
      logger.warn(`Invalid full name for Filevine search: "${trimmedName}"`);
      return null;
    }

    const axiosFilevine = AxiosFilevineAuth(token);

    const res = await axiosFilevine.get(`/fv-app/v2/Contacts`, {
      params: {
        firstName,
        lastName,
      },
    });

    if (!res?.data?.count) {
      return null;
    }

    return res.data.items?.[0] ?? null;
  } catch (error) {
    logger.error(
      "Error searching contact by name in Filevine:",
      error?.response?.data || error.message
    );
    return null;
  }
}

// async function searchContactbyIDInFilevine(id, token) {
//   try {
//     if (!id || !token) return null;

//     const axiosFilevine = AxiosFilevineAuth(token);

//     const res = await axiosFilevine.get(`fv-app/v2/Contacts/${id}`, {
//       data: {
//         ProjectTypeId: { Native: 990000083 },
//         ClientId: { Native: id },
//         ProjectName: "tessss",
//       },
//     });

//     return res?.data || null;
//   } catch (error) {
//     logger.error(
//       "Error in searching contact by ID in Filevine:",
//       error.response?.status,
//       error.response?.data || error.message
//     );
//     return null;
//   }
// }

async function createContactInFilevine(contact, deal) {
  try {
    const token = await filevineTokenManager.getToken();
    if (!contact || !token) {
      return null;
    }

    const c = contact.properties;
    const d = deal.properties || {};

    const get = (dealKey, contactKey) => {
      const value = d[dealKey] ?? c[contactKey] ?? null;

      if (value === "" || value === undefined) return null;

      return value;
    };

    const contactDetails = contact.properties;

    const body = {
      firstName: contactDetails.firstname,
      lastName: contactDetails.lastname,
      JobTitle: contactDetails?.jobtitle,
      Department: contactDetails?.department,

      BirthDate: contactDetails.client_dob,
      Salutation: contactDetails.salutation,
      DriversLicenseNumber: contactDetails.drivers_license,
      Notes: contactDetails.comments_about_this_contact,
      MaritalStatus: contactDetails.marital_status_,
      Gender: contactDetails.gender,
      FromCompany: "Test",
      // SocialSecurityNumber: contactDetails.social_security_number,

      PersonTypes: ["Person"],

      Phones: contactDetails?.client_phone
        ? [
            {
              PhoneId: {
                Native: -2147483648,
                Partner: null,
              },
              Number: contactDetails.client_phone,
              RawNumber: contactDetails.client_phone,
              Label: "Primary",
              IsSmsable: true,
              IsFaxable: false,
            },
          ]
        : [],

      Emails: contactDetails?.client_email
        ? [
            {
              EmailId: {
                Native: -2147483648,
                Partner: null,
              },
              Address: contactDetails.client_email,
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
              PostalCode: contactDetails?.zip_code ?? null,
              // Country: contactDetails?.country ?? null,
              Label: "Primary",
            },
          ]
        : [],

      // Not Present In FV
      // spouse: contactDetails.spouse,
    };

    // logger.info(`createContactInFilevine: ${JSON.stringify(body, null, 2)}`);

    const res = await AxiosFilevineAuth(token).post("fv-app/v2/Contacts", body);

    return res?.data;
  } catch (error) {
    logger.error("Error in creating contact in Filevine:", error);
    return null;
  }
}
async function updateContactInFilevine(contactId, contact) {
  try {
    const token = await filevineTokenManager.getToken();
    if (!contact || !token) {
      return null;
    }

    const contactDetails = contact.properties;

    const body = {
      firstName: contactDetails.firstname,
      lastName: contactDetails.lastname,
      JobTitle: contactDetails?.jobtitle,
      Department: contactDetails?.department,

      // initials: contactDetails?.initials,
      // SocialSecurityNumber: contactDetails?.social_security_number,
      // ClientHealthInsurancePlan: contactDetails?.client_health_ins_plan,
      // HealthInsuranceID: contactDetails?.health_ins_id,
      // Street: contactDetails?.address,
      // SpouseName: contactDetails?.spouse,
      // EmergencyContact: contactDetails?.emergency_contact,

      BirthDate: contactDetails.client_dob,
      Salutation: contactDetails.salutation,
      DriversLicenseNumber: contactDetails.drivers_license,
      Notes: contactDetails.comments_about_this_contact,
      MaritalStatus: contactDetails.marital_status_,
      Gender: contactDetails.gender,
      FromCompany: "Test",
      // SocialSecurityNumber: contactDetails.social_security_number,

      PersonTypes: ["Person"],

      Phones: contactDetails?.client_phone
        ? [
            {
              PhoneId: {
                Native: -2147483648,
                Partner: null,
              },
              Number: contactDetails.client_phone,
              RawNumber: contactDetails.client_phone,
              Label: "Primary",
              IsSmsable: true,
              IsFaxable: false,
            },
          ]
        : [],

      Emails: contactDetails?.client_email
        ? [
            {
              EmailId: {
                Native: -2147483648,
                Partner: null,
              },
              Address: contactDetails.client_email,
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
              PostalCode: contactDetails?.zip_code ?? null,
              // Country: contactDetails?.country ?? null,
              Label: "Primary",
            },
          ]
        : [],

      // Not Present In FV
      // spouse: contactDetails.spouse,
    };

    // logger.info(`updateContactInFilevine: ${JSON.stringify(body, null, 2)}`);

    const res = await AxiosFilevineAuth(token).patch(
      `fv-app/v2/Contacts/${contactId}`,
      body
    );

    return res?.data;
  } catch (error) {
    logger.error("Error in updating contact by ID in Filevine:", error);
    return null;
  }
}
async function createContactInFilevinUsingName(body) {
  try {
    const token = await filevineTokenManager.getToken();
    // -----------------------------------
    // Validate inputs FIRST
    // -----------------------------------

    if (!token || !body) {
      logger.warn("Payload and token are required for creating contact");
      return null;
    }

    const res = await AxiosFilevineAuth(token).post("fv-app/v2/Contacts", body);

    if (!res?.data) {
      logger.warn("Filevine contact creation succeeded but returned no data");
      return null;
    }

    logger.info(
      `Filevine contact created: ${res.data?.personId?.native ?? "unknown id"}`
    );

    return res.data;
  } catch (error) {
    logger.error(
      "Error creating contact in Filevine:",
      error?.response?.data || error
    );
    return null;
  }
}

async function createProjectInFilevine(contact, FVContactId) {
  try {
    const token = await filevineTokenManager.getToken();
    if (!contact || !token) return null;

    const contactDetails = contact.properties;

    const firstName = contactDetails.firstname || "";
    const lastName = contactDetails.lastname || "";
    const email = contactDetails.email || " ";

    let data = JSON.stringify({
      ProjectTypeId: {
        Native: 990000083,
      },
      ClientId: {
        Native: FVContactId,
      },
      ProjectName: `${firstName} ${lastName}`, // TODO : Udated need aproval
      // ProjectEmailAddress: email,
    });
    // ProjectName: `${firstName} ${lastName} ${email}`, // TODO :  Confirm after Updating

    const axiosFilevine = AxiosFilevineAuth(token);

    const projectResponse = await axiosFilevine.post(
      "fv-app/v2/Projects",
      data
    );

    return projectResponse.data;
  } catch (error) {
    logger.error("Error in createProjectInFilevine:", error);
  }
}

async function getIntakeByProjectID(projectID = "992365950", token) {
  try {
    if (!token) throw new Error("Missing Filevine token");
    if (!projectID) throw new Error("Missing projectID");

    const axiosFV = AxiosFilevineAuth(token);

    const response = await axiosFV.get(
      `/fv-app/v2/Projects/${projectID}/Forms/Intake`
    );

    return response.data;
  } catch (error) {
    logger.error("Error in getIntakeByProjectID:", error);
    return {};
  }
}
// async function updateIntakeUnderProject(projectID, token, data = {}) {
//   try {
//     if (!token) throw new Error("Missing Filevine token");
//     if (!projectID) throw new Error("Missing ProjectID");

// const body = {
//   isThisABurgAndBrockCase: data.isThisABurgAndBrockCase ?? "Yes",
//   dateOfInterview: data.dateOfInterview ?? "2025-11-19",
//   howDidYouHearAboutUs: data.howDidYouHearAboutUs ?? "Unknown",
//   language: data.language ?? "English",
// };

//     const axiosFV = AxiosFilevineAuth(token);

//     const res = await axiosFV.patch(
//       `/fv-app/v2/Projects/${projectID}/forms/intake`, // FIXED
//       body
//     );

//     logger.info(
//       `Intake updated under project ${projectID}: ${JSON.stringify(res.data)}`
//     );

//     return res.data;
//   } catch (error) {
//     logger.error("Error in updateIntakeUnderProject:", error);
//     logger.error("Error in updateIntakeUnderProject:", error.response?.data);
//     logger.error("Error in updateIntakeUnderProject:", error.message);
//     return null;
//   }
// }

// async function updateIntakeUnderProject(projectID, token, filevinePayload) {
//   try {
//     // if (!token) throw new Error("Missing Filevine token");
//     // if (!projectID) throw new Error("Missing ProjectID");
//     // if (!data.intake) throw new Error("Missing intake data in payload");

//     if (!token || !filevinePayload || !projectID) {
//       logger.info(
//         "Missing token or filevinePayload or projectID in updateIntakeUnderProject"
//       );
//       return null;
//     }

//     const axiosFV = AxiosFilevineAuth(token);

//     // PATCH expects the intake object
//     const res = await axiosFV.patch(
//       `/fv-app/v2/Projects/${projectID}/forms/intake`, // FIXED
//       filevinePayload
//     );

//     return res.data;
//   } catch (error) {
//     logger.error("Error in updateIntakeUnderProject:", error);
//     logger.error("Error in updateIntakeUnderProject:", error.response?.data);
//     logger.error("Error in updateIntakeUnderProject:", error.message);

//     return null;
//   }
// }

// Utility to remove empty values
function cleanProps(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

async function updateIntakeUnderProject(projectID, filevinePayload) {
  try {
    const token = await filevineTokenManager.getToken();

    if (!token || !filevinePayload || !projectID) {
      logger.warn(
        "Missing token, projectID, or payload in updateIntakeUnderProject",
        {
          projectID,
          tokenProvided: !!token,
          payloadKeys: filevinePayload ? Object.keys(filevinePayload) : null,
        }
      );
      return null;
    }

    // Use the correct parameter name
    const cleanedPayload = cleanProps(filevinePayload);

    // logger.info(`Body ${JSON.stringify(filevinePayload)}`);

    const axiosFV = AxiosFilevineAuth(token);

    // PATCH expects only the intake object
    const res = await axiosFV.patch(
      `/fv-app/v2/Projects/${projectID}/forms/intake`,
      cleanedPayload
    );

    logger.info(`Intake updated successfully for project ${projectID}`);
    return res.data;
  } catch (error) {
    // Graceful error logging
    const status = error.response?.status || "Unknown status";
    const data = error.response?.data || error.message || "No additional info";

    logger.error("Error in updateIntakeUnderProject", {
      projectID,
      status,
      data,
      message: error.message,
      stack: error.stack,
    });

    return null;
  }
}

import axios from "axios";

async function findFilevineContact({ token, firstName, lastName, payload }) {
  try {
    const url = `fv-app/v2/Contacts?firstName=${encodeURIComponent(
      firstName
    )}&lastName=${encodeURIComponent(lastName)}`;

    const axiosFV = AxiosFilevineAuth(token);

    const response = await axiosFV.get(url, {
      // data: payload, // body sent even in GET request to match curl
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching contact:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export {
  getTokenFromFilevine,
  searchContactbyIDInFilevine,
  createContactInFilevine,
  createProjectInFilevine,
  getIntakeByProjectID,
  updateIntakeUnderProject,
  findFilevineContact,
  searchContactByNameInFV,
  createContactInFilevinUsingName,
  updateContactInFilevine,
};
