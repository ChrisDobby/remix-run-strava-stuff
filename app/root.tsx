import { Meta, Scripts, Styles } from "@remix-run/react";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";

export default function App() {
    const { pathname } = useLocation();
    const includeScripts = pathname.startsWith("/athlete");
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <Styles />
            </head>
            <body>
                <Outlet />
                {includeScripts && <Scripts />}
            </body>
        </html>
    );
}
