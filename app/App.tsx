import { Meta, Scripts, Styles, Routes } from "@remix-run/react";
import { useLocation } from "react-router";

export default function App() {
    const { pathname } = useLocation();
    const includeScripts = pathname === "/athlete";
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <Meta />
                <Styles />
            </head>
            <body>
                <Routes />
                {includeScripts && <Scripts />}
            </body>
        </html>
    );
}
