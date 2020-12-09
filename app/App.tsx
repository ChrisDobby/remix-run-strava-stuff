import React from "react";
import { Meta, Styles, Routes, useGlobalData } from "@remix-run/react";

export default function App() {
    const data = useGlobalData();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <Styles />
            </head>
            <body>
                <Routes />
                {/* <Scripts /> */}
                <footer>
                    <p>This page was rendered at {data.date.toLocaleString()}</p>
                </footer>
            </body>
        </html>
    );
}
