require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const app = express();
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.static("public"));
app.use(cookieParser());

app.all(
    "*",
    createRequestHandler({
        getLoadContext(req, res) {
            return { req, res, port };
        },
    }),
);

app.listen(port, () => {
    console.log(`Express server started on http://localhost:${port}`);
});
