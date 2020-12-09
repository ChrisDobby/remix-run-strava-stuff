import { useRouteData } from "@remix-run/react";
import * as React from "react";

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
