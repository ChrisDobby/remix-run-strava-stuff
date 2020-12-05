import React from "react";
import { useRouteData } from "@remix-run/react";

export function meta() {
    return {
        title: "Remix Strava Stuff",
        description: "Do some things with Strava data - built with Remix!",
    };
}

export default function Index() {
    let data = useRouteData();

    return (
        <div style={{ textAlign: "center", padding: 20 }}>
            <h2>Welcome to Remix!</h2>
            <p>
                <a href="https://remix.run/dashboard/docs">Check out the docs</a> to get started.
            </p>
            <p>Message from the loader: {data.message}</p>
        </div>
    );
}
