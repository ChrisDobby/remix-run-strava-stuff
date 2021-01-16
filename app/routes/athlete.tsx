import { useRouteData } from "@remix-run/react";
import type { DataLoader } from "@remix-run/core";
import { withAuth } from "../auth";

export const loader: DataLoader = withAuth(({ context: { stravaAuth } }) =>
    fetch("https://www.strava.com/api/v3/athlete/activities", {
        headers: { Authorization: `Bearer ${stravaAuth.access_token}` },
    }),
);

type Activity = {
    id: number;
    start_date: string;
    name: string;
};

type Error = { message: string };
type AthleteData = Activity[] | Error;

export default function Athlete() {
    const data: AthleteData = useRouteData();

    if ((data as Error).message) {
        return <div>{(data as Error).message}</div>;
    }

    const activities = data as Activity[];
    return (
        <ul>
            {activities.map(activity => (
                <li key={activity.id}>{`${activity.name}(${new Date(
                    activity.start_date,
                ).toLocaleDateString()} ${new Date(activity.start_date).toLocaleTimeString()})`}</li>
            ))}
        </ul>
    );
}
