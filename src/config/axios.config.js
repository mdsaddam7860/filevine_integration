import axios from "axios";

const AxiosFilevine = axios.create({
  baseURL: "https://identity.filevine.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const AxiosFilevineAuth = function (token) {
  return axios.create({
    baseURL: "https://api.filevineapp.com/",
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-fv-orgid": "6811",
      "x-fv-userid": "990022745",
    },
  });
};

const hubspotAxios = axios.create({
  baseURL: "https://api.hubapi.com/crm/v3/objects/",
  headers: {
    Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export { AxiosFilevine, hubspotAxios, AxiosFilevineAuth };
