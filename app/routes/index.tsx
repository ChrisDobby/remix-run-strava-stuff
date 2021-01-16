import { Link, useRouteData } from "@remix-run/react";
import type { Loader } from "@remix-run/data";
import { hasStravaAuth } from "../auth";

export const loader: Loader = async ({ context }) => {
    const { req } = context;
    return {
        isAuthenticated: hasStravaAuth(req),
    };
};

export function meta() {
    return {
        title: "Strava Stuff",
    };
}

export default function Index() {
    const { isAuthenticated } = useRouteData();

    return (
        <div style={{ textAlign: "center", padding: 20 }}>
            <h2>Welcome to some Strava stuff!</h2>
            <Link to="/athlete">{isAuthenticated ? "View activities" : "Log in to Strava"}</Link>
        </div>
    );
}
