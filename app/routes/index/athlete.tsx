import { useRouteData } from "@remix-run/react";
import { Outlet, useLocation } from "react-router";
import { Header, ActivityList } from "../../athlete";
import { StravaActivitySummary, StravaAthlete, StravaAthleteStats } from "../../types";

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
        <div className="grid grid-cols-4 h-full overflow-hidden">
            <div className="col-start-1 border-r-2 border-gray-200">
                <Header {...athlete} {...stats} />
            </div>
            <div className="col-start-2 border-r-2 border-gray-200 h-full overflow-y-auto">
                <ActivityList actvities={activities} currentPath={pathname} />
            </div>
            <div className="col-start-3 col-end-5 h-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
