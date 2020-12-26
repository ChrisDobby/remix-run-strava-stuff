import type { Loader } from "@remix-run/data";
import { withAuth } from "../../../auth";

export const loader: Loader = withAuth(async ({ context: { stravaAuth }, params: { id } }) => {
    try {
        const headers = { Authorization: `Bearer ${stravaAuth.access_token}` };
        const activityResponse = await fetch(`https://www.strava.com/api/v3/activities/${id}`, { headers });
        const activity = await activityResponse.json();
        return activity;
    } catch (ex) {
        return ex;
    }
});
