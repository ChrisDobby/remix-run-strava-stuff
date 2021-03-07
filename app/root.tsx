import type { LinksFunction } from "@remix-run/react";
import { Meta, Links } from "@remix-run/react";
import { Outlet } from "react-router-dom";
import styles from "css:./styles/global.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                {/* <Scripts /> */}
            </body>
        </html>
    );
}
