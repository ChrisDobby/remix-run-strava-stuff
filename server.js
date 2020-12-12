require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const { createRequestHandler } = require("@remix-run/express");
const cookieParser = require("cookie-parser");
const { retrieveToken, STRAVA_TOKEN_COOKIE_NAME } = require("./tokenUtils");
const port = process.env.PORT || 3000;

const app = express();
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.static("public"));
app.use(cookieParser());

app.use(
    session({
        secret: "r3mixR0x",
        resave: false,
        saveUninitialized: true,
        sameSite: true,
    }),
);

app.get("/delete-cookie", (_, res) => {
    res.clearCookie(STRAVA_TOKEN_COOKIE_NAME);
    res.redirect("/");
});

app.get("/auth", async (req, res) => {
    const { code, scope } = req.query;
    try {
        res.cookie(STRAVA_TOKEN_COOKIE_NAME, JSON.stringify(await retrieveToken({ code, scope })), { httpOnly: true });
        res.redirect(req.session.lastRequestPath || "/");
    } catch (ex) {
        session.errorMessage = "There was a problem logging in";
        res.redirect("/");
    }
});

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
