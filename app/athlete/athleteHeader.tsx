import { StravaAthlete, StravaAthleteStats } from "../types";
import { RunIcon, RideIcon, SwimIcon } from "./icons";
import { distanceInKm } from "./utils";

type Props = StravaAthlete & StravaAthleteStats & { className?: string };

export default function AthleteHeader({
    firstname,
    lastname,
    profile,
    recent_run_totals: { distance: recentRunDistance },
    recent_ride_totals: { distance: recentRideDistance },
    recent_swim_totals: { distance: recentSwimDistance },
    className = "",
}: Props) {
    return (
        <div className={`lg:flex lg:items-center lg:justify-between p-4 ${className}`}>
            <div className="min-w-0">
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full mr-2" src={profile} />
                    <h2 className="text-2xl font-bold leading-7 text-gray-900">{`${firstname} ${lastname}`}</h2>
                </div>
                <div className="mt-1 flex xl:flex-col">
                    <div className="mt-2 flex items-center text-sm text-gray-500 mr-3">Last four weeks</div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 mr-3">
                        <RunIcon />
                        {distanceInKm(recentRunDistance)}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 mr-3">
                        <RideIcon />
                        {distanceInKm(recentRideDistance)}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <SwimIcon />
                        {distanceInKm(recentSwimDistance)}
                    </div>
                </div>
            </div>
        </div>
    );
}
