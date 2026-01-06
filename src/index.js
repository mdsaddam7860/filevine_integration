import { logger } from "./utils/winston.logger.js";
import { app } from "./app.js";
import {
  AxiosFilevine,
  hubspotAxios,
  AxiosFilevineAuth,
} from "./config/axios.config.js";
import {
  getTokenFromFilevine,
  searchContactbyIDInFilevine,
  createContactInFilevine,
  createProjectInFilevine,
  updateIntakeUnderProject,
  getIntakeByProjectID,
  searchContactByNameInFV,
  createContactInFilevinUsingName,
} from "./services/filevine.service.js";
import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";
import {
  getContactFromHubspot,
  updateContactInHubspot,
  getHubspotContact,
  fetchHubspotDeal,
  updateHubSpotContactProjectId,
  getDealIdsForContact,
} from "./services/hubspot.service.js";

import {
  mapHubspotToFilevine,
  splitFullName,
  filevineContactPayload,
} from "./utils/helperFunction.js";

import { filevineTokenManager } from "./services/auth/tokenManager.js";
import { filevineExecutor } from "./utils/executor.js";

export {
  filevineExecutor,
  filevineTokenManager,
  filevineContactPayload,
  logger,
  app,
  AxiosFilevine,
  hubspotAxios,
  splitFullName,
  AxiosFilevineAuth,
  getTokenFromFilevine,
  hubspotToFilevine,
  getContactFromHubspot,
  searchContactbyIDInFilevine,
  createContactInFilevine,
  updateContactInHubspot,
  createProjectInFilevine,
  updateIntakeUnderProject,
  getIntakeByProjectID,
  mapHubspotToFilevine,
  getHubspotContact,
  fetchHubspotDeal,
  updateHubSpotContactProjectId,
  getDealIdsForContact,
  searchContactByNameInFV,
  createContactInFilevinUsingName,
};

/* Workflow

Query hubspot contact -> search filevine contact based on sourceid in hubspot contact -> if source id is blank -> post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact, then create project contact in filevine

*/

/* Create project in filevine -> create project contact in filevine -> create project in hubspot -> create project contact in hubspot   */
