import qs from "qs";
// import AxiosFilevine from "./axiosFilevine.js"; // your axios instance
import { logger, AxiosFilevine } from "../../index.js";

class FilevineTokenManager {
  constructor() {
    this.accessToken = null;
    this.expiresAt = null;
    this.refreshPromise = null; // prevents parallel refresh
  }

  /**
   * Returns a valid access token
   */
  async getToken() {
    // If token exists and is not expired, reuse it
    if (this.accessToken && !this.isTokenExpired()) {
      return this.accessToken;
    }

    // If a refresh is already in progress, wait for it
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // Otherwise refresh token
    this.refreshPromise = this.refreshToken();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Checks if token is expired (with buffer)
   */
  isTokenExpired() {
    if (!this.expiresAt) return true;

    // Refresh 2 minutes before actual expiry
    const bufferMs = 2 * 60 * 1000;
    return Date.now() >= this.expiresAt - bufferMs;
  }

  /**
   * Fetches new token from Filevine
   */
  async refreshToken() {
    try {
      logger.info("Refreshing Filevine access token");

      const data = qs.stringify({
        client_id: process.env.FILEVINE_CLIENT_ID,
        client_secret: process.env.FILEVINE_CLIENT_SECRET,
        grant_type: "personal_access_token",
        token: process.env.FILEVINE_TOKEN,
        scope:
          "fv.api.gateway.access tenant filevine.v2.api.* openid email fv.auth.tenant.read",
      });

      const response = await AxiosFilevine.post("connect/token", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, expires_in } = response.data;

      this.accessToken = access_token;
      this.expiresAt = Date.now() + expires_in * 1000;

      logger.info(`Filevine token refreshed. Expires in ${expires_in} seconds`);

      return this.accessToken;
    } catch (error) {
      logger.error("Failed to refresh Filevine token", error);
      this.accessToken = null;
      this.expiresAt = null;
      throw error;
    }
  }
}

export const filevineTokenManager = new FilevineTokenManager();
