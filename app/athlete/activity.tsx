import dateFormat from "dateformat";
import { StravaActivity, StravaActivitySplit } from "../types";
import { ActivityIcon } from "./icons";
import { calculateSpeedAndPace, timeFromSeconds } from "./utils";

type ChildrenProps = { children?: React.ReactNode | React.ReactNodeArray };
function ActivitySectionHeader({ children }: ChildrenProps) {
    return (
        <div className="col-start-1 col-end-3 bg-gray-500 border-transparent shadow-lg group block rounded-lg p-2 text-white text-xs font-bold">
            {children}
        </div>
    );
}

function ActivityHeading({ children }: ChildrenProps) {
    return <div className="col-start-1 font-bold text-sm">{children}</div>;
}

function ActivityDetail({ children }: ChildrenProps) {
    return <div className="col-start-2 text-sm">{children}</div>;
}

function SplitHeader({ children }: ChildrenProps) {
    return <div className="text-sm font-bold">{children}</div>;
}

function SplitLine({ split }: { split: StravaActivitySplit }) {
    const [averageSpeed, averagePace] = calculateSpeedAndPace(split.average_speed);
    return (
        <>
            <div className="text-xs text-gray-600">{split.split}</div>
            <div className="text-xs text-gray-700">{timeFromSeconds(split.moving_time)}</div>
            <div className="text-xs text-gray-700">{`${split.elevation_difference} m`}</div>
            <div className="text-xs text-gray-700">{averageSpeed}</div>
            <div className="text-xs text-gray-700">{averagePace}</div>
        </>
    );
}

type Props = { activity: StravaActivity };

export default function Activity({ activity }: Props) {
    const [averageSpeed, averagePace] = calculateSpeedAndPace(activity.average_speed);
    const [maxSpeed, maxPace] = calculateSpeedAndPace(activity.max_speed);

    return (
        <>
            <div className="border-gray-200 border-b pb-2">
                <div className="text-2xl text-gray-800 font-bold flex items-center">
                    <ActivityIcon type={activity.type} /> {activity.name}
                </div>
                <div className="text-lg text-gray-500 font-bold">
                    {`${dateFormat(activity.start_date_local, "dd mmm yyyy")} at ${dateFormat(
                        activity.start_date_local,
                        "HH:MM",
                    )} for ${timeFromSeconds(activity.moving_time)}`}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <ActivitySectionHeader>Pace</ActivitySectionHeader>
                <ActivityHeading>Average pace</ActivityHeading>
                <ActivityDetail>{averagePace}</ActivityDetail>
                <ActivityHeading>Best pace</ActivityHeading>
                <ActivityDetail>{maxPace}</ActivityDetail>
                <ActivitySectionHeader>Speed</ActivitySectionHeader>
                <ActivityHeading>Average speed</ActivityHeading>
                <ActivityDetail>{averageSpeed}</ActivityDetail>
                <ActivityHeading>Max speed</ActivityHeading>
                <ActivityDetail>{maxSpeed}</ActivityDetail>
                {activity.has_heartrate && (
                    <>
                        <ActivitySectionHeader>Heart rate</ActivitySectionHeader>
                        <ActivityHeading>Average heart rate</ActivityHeading>
                        <ActivityDetail>{`${activity.average_heartrate} bpm`}</ActivityDetail>
                        <ActivityHeading>Max heart rate</ActivityHeading>
                        <ActivityDetail>{`${activity.max_heartrate} bpm`}</ActivityDetail>
                    </>
                )}
                <ActivitySectionHeader>Elevation</ActivitySectionHeader>
                <ActivityHeading>Elevation gain</ActivityHeading>
                <ActivityDetail>{`${activity.total_elevation_gain} m`}</ActivityDetail>
                <ActivityHeading>Min elevation</ActivityHeading>
                <ActivityDetail>{`${activity.elev_high} m`}</ActivityDetail>
                <ActivityHeading>Max elevation</ActivityHeading>
                <ActivityDetail>{`${activity.elev_low} m`}</ActivityDetail>
                <ActivitySectionHeader>Splits</ActivitySectionHeader>
            </div>
            <div className="grid grid-cols-5 gap-y-2">
                <div>&nbsp;</div>
                <SplitHeader>Time</SplitHeader>
                <SplitHeader>Elevation</SplitHeader>
                <SplitHeader>Avg pace</SplitHeader>
                <SplitHeader>Avg speed</SplitHeader>
                {activity.splits_metric.map(split => (
                    <SplitLine key={split.split} split={split} />
                ))}
            </div>
        </>
    );
}
