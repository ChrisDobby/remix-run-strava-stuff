import type { DataLoader } from "@remix-run/core";
import { withAuth } from "../auth";

export const loader: DataLoader = withAuth(({ context: { stravaAuth } }) =>
    fetch("https://www.strava.com/api/v3/athlete/activities", {
        headers: { Authorization: `Bearer ${stravaAuth.access_token}` },
    }),
);
