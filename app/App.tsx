import { Meta, Styles, Routes } from "@remix-run/react";

export default function App() {
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
