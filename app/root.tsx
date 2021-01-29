import { Meta, Styles } from "@remix-run/react";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <Styles />
            </head>
            <body>
                <Outlet />
                {/* <Scripts /> */}
            </body>
        </html>
    );
}
