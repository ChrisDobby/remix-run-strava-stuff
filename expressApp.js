const express = require("express");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");
const serverless = require("serverless-http");

const app = express();
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.static("public"));

app.all(
    "*",
    createRequestHandler({
        getLoadContext(req, res) {
            return { req, res };
        },
    }),
);

module.exports = app;
module.exports.handler = serverless(app);
