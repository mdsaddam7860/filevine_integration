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
} from "./services/filevine.service.js";
import { hubspotToFilevine } from "./controllers/hubspotToFilevine.controller.js";
import {
  getContactFromHubspot,
  updateContactInHubspot,
  getHubspotContact,
  fetchHubspotDeal,
} from "./services/hubspot.service.js";

import { mapHubspotToFilevine } from "./utils/helperFunction.js";

export {
  logger,
  app,
  AxiosFilevine,
  hubspotAxios,
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
};

/* Workflow

Query hubspot contact -> search filevine contact based on sourceid in hubspot contact -> if source id is blank -> post contact in filevine and update contact in hubspot to store filevine id in sourceid field on contact, then create project contact in filevine

*/

/* Create project in filevine -> create project contact in filevine -> create project in hubspot -> create project contact in hubspot   */
