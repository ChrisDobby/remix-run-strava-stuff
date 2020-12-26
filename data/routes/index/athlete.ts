import type { Loader } from "@remix-run/data";
import { withAuth } from "../../auth";

export const loader: Loader = withAuth(async ({ context: { stravaAuth } }) => {
    try {
        const headers = { Authorization: `Bearer ${stravaAuth.access_token}` };
        const [athleteResponse, activitiesResponse] = await Promise.all([
            fetch("https://www.strava.com/api/v3/athlete", { headers }),
            fetch("https://www.strava.com/api/v3/athlete/activities", { headers }),
        ]);
        const athlete = await athleteResponse.json();
        const activities = await activitiesResponse.json();
        const statsResponse = await fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, { headers });
        const stats = await statsResponse.json();
        return { athlete, stats, activities };
    } catch (ex) {
        return ex;
    }
});
