import { AxiosFilevine, logger, AxiosFilevineAuth } from "../index.js";
import qs from "qs";
import util from "util";

async function getTokenFromFilevine() {
  try {
    let data = qs.stringify({
      client_id: process.env.FILEVINE_CLIENT_ID,
      client_secret: process.env.FILEVINE_CLIENT_SECRET,
      grant_type: "personal_access_token",
      token: "4882F429933DF86728A2837A9332F4CFCA555A45C862E8821015C44E68F60CC3",
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

async function searchContactbyIDInFilevine(id, token) {
  try {
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

async function createContactInFilevine(contact, token) {
  try {
    if (!contact || !token) {
      return null;
    }

    const contactDetails = contact.properties;

    const body = {
      firstName: contactDetails.firstname,
      lastName: contactDetails.lastname,
      email: contactDetails.email,
    };

    const res = await AxiosFilevineAuth(token).post("fv-app/v2/Contacts", body);

    // if (res?.data?.personId?.native) {
    //   logger.info(`Contact created in Filevine: ${res.data.personId.native}`);
    // } else {
    //   logger.warn("Filevine contact created, but no personId returned");
    // }

    return res?.data;
    // const filter = `id=${id}`
    // const getContact = await AxiosFilevine.get("fv-app/v2/Contacts");
  } catch (error) {
    logger.error("Error in searching contact by ID in Filevine:", error);
    return null;
  }
}

async function createProjectInFilevine(contact, token) {
  try {
    if (!contact || !token) return null;

    const contactDetails = contact.properties;
    const firstName = contactDetails.firstname || "";
    const lastName = contactDetails.lastname || " ";
    const email = contactDetails.email || " ";

    let data = JSON.stringify({
      ProjectTypeId: {
        Native: 990000083,
      },
      ClientId: {
        Native: 996817622,
      },
      ProjectName: `${firstName} ${lastName} ${email}`,
    });

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

//     const body = {
//       isThisABurgAndBrockCase: data.isThisABurgAndBrockCase ?? "Yes",
//       dateOfInterview: data.dateOfInterview ?? "2025-11-19",
//       howDidYouHearAboutUs: data.howDidYouHearAboutUs ?? "Unknown",
//       language: data.language ?? "English",
//     };

//     const axiosFV = AxiosFilevineAuth(token);

//     const res = await axiosFV.patch(
//       `/fv-app/v2/Projects/${projectID}/forms/intake`, // FIXED
//       body
//     );

//     return res.data;
//   } catch (error) {
//     logger.error("Error in updateIntakeUnderProject:", error);
//     return null;
//   }
// }

async function updateIntakeUnderProject(projectID, token, data = {}) {
  try {
    if (!token) throw new Error("Missing Filevine token");
    if (!projectID) throw new Error("Missing ProjectID");
    if (!data.intake) throw new Error("Missing intake data in payload");

    const axiosFV = AxiosFilevineAuth(token);

    // PATCH expects the intake object
    const res = await axiosFV.patch(
      `/fv-app/v2/Projects/${projectID}/forms/intake`,
      data.intake
    );

    return res.data;
  } catch (error) {
    logger.error("Error in updateIntakeUnderProject:", error);
    return null;
  }
}

export {
  getTokenFromFilevine,
  searchContactbyIDInFilevine,
  createContactInFilevine,
  createProjectInFilevine,
  getIntakeByProjectID,
  updateIntakeUnderProject,
};
