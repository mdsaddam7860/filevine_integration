import { createRequestExecutor } from "./requestExecutor.js";

const hubspotExecutor = createRequestExecutor({
  name: "HubSpot",
  rateLimit: 8,
  intervalMs: 1000,
  retries: 3,
});

const filevineExecutor = createRequestExecutor({
  name: "Filevine",
  rateLimit: 5,
  intervalMs: 1000,
  retries: 3,
});

export { hubspotExecutor, filevineExecutor };

/***!SECTION
 * 3. How you use it (this is the important part)
Axios call (Intermedia)
await intermediaExecutor(
  () => intermediaAxios(token).get(`users/${userId}/call-recordings`),
  { userId }
);

HubSpot update
await hubspotExecutor(
  () => hubspotClient.crm.contacts.basicApi.update(contactId, payload),
  { contactId }
);

Gong upload (your historic recordings sync)
await gongExecutor(
  () => uploadMediaToGong(recording),
  { recordingId: recording.id }
);
*/
