import * as React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { StravaActivitySummary } from "../types";
import { ActivityIcon, ElevationIcon } from "./icons";
import { distanceInKm } from "./utils";

function ActivityLink({ children, to }: { children: React.ReactNode; to: string }) {
    return <Link to={to}>{children}</Link>;
}

const unselectedLiClassName =
    "hover:bg-gray-500 hover:border-transparent hover:shadow-lg group block rounded-lg border border-gray-200";
const selectedLiClassName = "bg-gray-500 border-transparent shadow-lg group block rounded-lg";
type Props = { actvities: StravaActivitySummary[]; currentPath: string };

export default function ActivityList({ actvities, currentPath }: Props) {
    const selectedItemRef = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        if (!selectedItemRef.current) {
            return;
        }

        const selectedItem = selectedItemRef.current;
        const { bottom: selectedItemBottom, top: selectedItemTop } = selectedItem.getBoundingClientRect();
        const scrollContainer = selectedItem.parentElement?.parentElement?.parentElement;
        const selectedItemNotVisible =
            scrollContainer &&
            (selectedItemTop < scrollContainer.offsetTop ||
                selectedItemBottom > scrollContainer.offsetTop + scrollContainer.offsetHeight);
        if (selectedItemNotVisible) {
            selectedItem.scrollIntoView();
        }
    }, []);

    return (
        <ul className="grid grid-cols-1 gap-4 p-2">
            {actvities.map(activity => {
                const { id, name, type, distance, start_date_local, total_elevation_gain } = activity;
                const path = `/athlete/activity/${id}`;
                const isSelected = currentPath.startsWith(path);
                const item = (
                    <dl className="grid grid-cols-1 grid-rows-2 items-center p-4">
                        <div className={`flex ${isSelected ? "text-white" : "text-black group-hover:text-white"}`}>
                            <div className="leading-6 font-medium flex-1">{name}</div>
                            <div className="text-xs font-medium">
                                {dateFormat(new Date(start_date_local), "dd-mmm-yyyy")}
                            </div>
                        </div>
                        <div
                            className={`flex items-center text-sm font-medium ${
                                isSelected ? "text-gray-300" : "text-gray-500 group-hover:text-gray-300"
                            }`}
                        >
                            <ActivityIcon type={type} />
                            {distanceInKm(distance)}
                            &emsp;
                            <ElevationIcon />
                            {`${total_elevation_gain} m`}
                        </div>
                    </dl>
                );

                return (
                    <li key={id} className={isSelected ? selectedLiClassName : unselectedLiClassName}>
                        {isSelected ? (
                            <div ref={selectedItemRef}>{item}</div>
                        ) : (
                            <ActivityLink to={`/athlete/activity/${id}`}>{item}</ActivityLink>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
