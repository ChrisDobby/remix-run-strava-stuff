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
            </body>
        </html>
    );
}
