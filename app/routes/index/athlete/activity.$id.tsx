import { useRouteData } from "@remix-run/react";
import { Activity } from "../../../athlete";

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
