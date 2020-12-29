import { json, Loader } from "@remix-run/data";
import { withAuth } from "../../../auth";

export const loader: Loader = withAuth(async ({ context: { stravaAuth }, params: { id } }) => {
    const headers = { Authorization: `Bearer ${stravaAuth.access_token}` };
    const activities = await fetch(`https://www.strava.com/api/v3/activities/${id}`, { headers });
    return json(await activities.json(), { headers: { "cache-control": "max-age=3600" } });
});
