import { useRouteData } from "@remix-run/react";
import dateFormat from "dateformat";
import { Activity } from "../../../athlete";
import { StravaActivity, StravaAthlete } from "../../../types";
import { json, Loader } from "@remix-run/data";
import { withAuth } from "../../../auth";

export const loader: Loader = withAuth(async ({ context: { headers }, params: { id } }) => {
    const activities = await fetch(`https://www.strava.com/api/v3/activities/${id}`, { headers });
    return json(await activities.json(), { headers: { "cache-control": "max-age=3600" } });
});

export default function ActivityId() {
    const activity = useRouteData();
    return (
        <div className="p-2">
            <Activity activity={activity} />
        </div>
    );
}

export function headers({ loaderHeaders }: { loaderHeaders: Headers }) {
    return {
        "cache-control": loaderHeaders.get("cache-control"),
    };
}

export function meta({ data, parentsData }: { data: StravaActivity; parentsData: { [name: string]: any } }) {
    const { athlete } = parentsData["routes/index/athlete"];
    return {
        title: `${athlete.firstname} ${athlete.lastname} | ${data.name} | ${dateFormat(
            data.start_date_local,
            "dd mmm yyyy",
        )}`,
    };
}
