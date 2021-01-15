import { Link, useRouteData } from "@remix-run/react";
import dateFormat from "dateformat";
import { Activity, ActivityHeader } from "../../../athlete";
import { StravaActivity } from "../../../types";
import { json, Loader } from "@remix-run/data";
import { withAuth } from "../../../auth";

export const loader: Loader = withAuth(async ({ context: { headers }, params: { id } }) => {
    const activities = await fetch(`https://www.strava.com/api/v3/activities/${id}`, { headers });
    return json(await activities.json(), { headers: { "cache-control": "max-age=3600" } });
});

export default function ActivityId() {
    const activity = useRouteData() as StravaActivity;
    return (
        <div className="p-2">
            <ActivityHeader activity={activity}>
                <Link
                    to={`/athlete/activity/${activity.id}/edit`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-h-10"
                >
                    <svg
                        className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                </Link>
            </ActivityHeader>
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
