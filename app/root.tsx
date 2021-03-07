import type { LinksFunction } from "@remix-run/react";
import { Meta, Scripts, Links } from "@remix-run/react";
import { useLocation } from "react-router";
import { Outlet, useLocation } from "react-router-dom";
import tailwind from "css:./styles/tailwind.css";
import styles from "css:./styles/global.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: tailwind },
        { rel: "stylesheet", href: styles },
    ];
};

export default function App() {
    const { pathname } = useLocation();
    const includeScripts = pathname.startsWith("/athlete");
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                {includeScripts && <Scripts />}
            </body>
        </html>
    );
}
