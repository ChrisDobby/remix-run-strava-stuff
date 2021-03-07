import { createCookie } from "@remix-run/data";

const STRAVA_TOKEN_COOKIE_NAME = "strava.token";

export const stravaCookie = createCookie(STRAVA_TOKEN_COOKIE_NAME, { httpOnly: true });
