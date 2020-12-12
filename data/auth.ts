import type { Loader } from "@remix-run/data";
import { redirect } from "@remix-run/data";
import url from "url";
import FormData from "form-data";

const STRAVA_TOKEN_COOKIE_NAME = "strava.token";
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID as string;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET as string;
const STRAVA_AUTHORISE_URL = process.env.STRAVA_AUTHORISE_URL || "https://www.strava.com/oauth/authorize";
const STRAVA_TOKEN_URL = process.env.STRAVA_TOKEN_URL || "https://www.strava.com/oauth/token";

type StravaAuth = { access_token: string; refresh_token: string; expires_at: number; scope: string };
type RequestWithCookies = { cookies: { [name: string]: string } };

function getAuth({ cookies }: RequestWithCookies): StravaAuth | null {
    const cookie = cookies[STRAVA_TOKEN_COOKIE_NAME];
    return cookie ? JSON.parse(cookie) : null;
}

function hasTokenExpired(expiry: number) {
    const now = new Date();
    const millisecondsSinceEpoch = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const secondsSinceEpoch = Math.round(millisecondsSinceEpoch / 1000);
    return secondsSinceEpoch > expiry;
}

async function refreshAuth(auth: StravaAuth) {
    const { refresh_token, scope } = auth;
    const formData = new FormData();
    formData.append("client_id", STRAVA_CLIENT_ID);
    formData.append("client_secret", STRAVA_CLIENT_SECRET);
    formData.append("refresh_token", refresh_token);
    formData.append("grant_type", "refresh_token");

    const stravaResponse = await fetch(STRAVA_TOKEN_URL, {
        method: "POST",
        body: formData as any,
    });
    const { athlete, ...stravaJson } = await stravaResponse.json();
    return { ...stravaJson, scope };
}

export function withAuth(loader: Loader): Loader {
    return async args => {
        const {
            context: { req, res, port },
            session,
            request,
        } = args;

        let stravaAuth = getAuth(req);
        if (!stravaAuth) {
            const { path, host, protocol } = url.parse((request as Request).url);
            session.set("lastRequestPath", path ?? "/");
            return redirect(
                `${STRAVA_AUTHORISE_URL}?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${protocol}//${host}:${port}/auth&response_type=code&approval_prompt=auto&scope=activity:read_all,activity:write`,
            );
        }

        if (hasTokenExpired(stravaAuth.expires_at)) {
            stravaAuth = await refreshAuth(stravaAuth);
            res.cookie(STRAVA_TOKEN_COOKIE_NAME, JSON.stringify(stravaAuth), { httpOnly: true });
        }

        return loader({ ...args, context: { ...args.context, stravaAuth } });
    };
}

export function hasStravaAuth(req: RequestWithCookies) {
    return Boolean(getAuth(req));
}
