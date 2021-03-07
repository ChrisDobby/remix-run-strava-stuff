import { useRouteData } from "@remix-run/react";
import { Activity } from "../../../athlete";
import type { Loader } from "@remix-run/data";
import { withAuth } from "../../../auth";

export const loader: Loader = withAuth(async ({ context: { headers }, params: { id } }) => {
    return fetch(`https://www.strava.com/api/v3/activities/${id}`, { headers });
});

export default function ActivityId() {
    const activity = useRouteData();
    return (
        <div className="p-2">
            <Activity activity={activity} />
        </div>
    );
}
