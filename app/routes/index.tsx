import { useRouteData } from "@remix-run/react";
import { Outlet } from "react-router";
import NavBar from "../navBar";

export function meta() {
    return {
        title: "Strava Stuff",
    };
}

export default function Index() {
    const { isAuthenticated } = useRouteData();

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <NavBar isAuthenticated={isAuthenticated} />
            <div className="flex-1 h-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}
