import type { Loader } from "@remix-run/data";
import { withAuth } from "../auth";

export const loader: Loader = withAuth(({ context: { stravaAuth } }) =>
    fetch("https://www.strava.com/api/v3/athlete/activities", {
        headers: { Authorization: `Bearer ${stravaAuth.access_token}` },
    }),
);
