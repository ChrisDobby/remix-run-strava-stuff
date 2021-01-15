import dateFormat from "dateformat";
import { StravaActivity } from "../types";
import { ActivityIcon } from "./icons";
import { timeFromSeconds } from "./utils";

type Props = { activity: StravaActivity; children?: React.ReactNode | React.ReactNodeArray };

export default function ActivityHeader({ activity, children }: Props) {
    return (
        <div className="border-gray-200 border-b pb-2 flex">
            <div className="flex-1">
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
            {children}
        </div>
    );
}
