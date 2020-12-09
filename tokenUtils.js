const fetch = require("node-fetch");
const FormData = require("form-data");

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_TOKEN_COOKIE_NAME = "strava.token";
const STRAVA_TOKEN_URL = process.env.STRAVA_TOKEN_URL || "https://www.strava.com/oauth/token";

async function retrieveToken({ code, scope }) {
    const formData = new FormData();
    formData.append("client_id", STRAVA_CLIENT_ID);
    formData.append("client_secret", STRAVA_CLIENT_SECRET);
    formData.append("code", code);
    formData.append("grant_type", "authorization_code");

    const stravaResponse = await fetch(STRAVA_TOKEN_URL, {
        method: "POST",
        body: formData,
    });
    const { athlete, ...stravaJson } = await stravaResponse.json();
    return { ...stravaJson, scope };
}

module.exports = {
    retrieveToken,
    STRAVA_TOKEN_COOKIE_NAME,
};
