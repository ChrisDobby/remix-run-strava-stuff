import { useRouteData } from "@remix-run/react";
import { Outlet, useLocation } from "react-router";
import { Header, ActivityList } from "../../athlete";
import { StravaActivitySummary, StravaAthlete, StravaAthleteStats } from "../../types";
import type { Loader } from "@remix-run/data";
import { withAuth } from "../../auth";

export const loader: Loader = withAuth(async ({ context: { headers } }) => {
    try {
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

type Error = { message: string };
type AthleteData = { athlete: StravaAthlete; stats: StravaAthleteStats; activities: StravaActivitySummary[] };
type AthleteRouteData = AthleteData | Error;

export default function Athlete() {
    const data: AthleteRouteData = useRouteData();

    if ((data as Error).message) {
        return <div>{(data as Error).message}</div>;
    }

    const { athlete, stats, activities } = data as AthleteData;
    const { pathname } = useLocation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 grid-rows-hlb md:grid-rows-hb xl:grid-rows-1 h-full overflow-hidden">
            <div className="col-start-1 col-end-4 xl:col-end-2 row-start-1 border-b-2 xl:border-b-0 xl:border-r-2 border-gray-200 mb-2 xl:mb-0">
                <Header {...athlete} {...stats} />
            </div>
            <div className="col-start-1 xl:col-start-2 row-start-2 xl:row-start-1 border-b-2 md:border-b-0 md:border-r-2 border-gray-200 h-full overflow-y-auto mb-2 md:mb-0">
                <ActivityList actvities={activities} currentPath={pathname} />
            </div>
            <div className="col-start-1 md:col-start-2 xl:col-start-3 col-end-4 xl:col-end-5 row-start-3 md:row-start-2 xl:row-start-1 h-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
