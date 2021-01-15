import { redirect } from "@remix-run/data";
import url from "url";
import type { Loader } from "@remix-run/data";
import FormData from "form-data";
import { getSession, commitSession } from "./session";
import { stravaCookie } from "./cookies";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID as string;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET as string;
const STRAVA_AUTHORISE_URL = process.env.STRAVA_AUTHORISE_URL || "https://www.strava.com/oauth/authorize";
const STRAVA_TOKEN_URL = process.env.STRAVA_TOKEN_URL || "https://www.strava.com/oauth/token";

type StravaAuth = { access_token: string; refresh_token: string; expires_at: number; scope: string };

function getAuth(request: Request): StravaAuth | null {
    const token = stravaCookie.parse(request.headers.get("Cookie"));
    return token || null;
}

function hasTokenExpired(expiry: number) {
    const now = new Date();
    const millisecondsSinceEpoch = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const secondsSinceEpoch = Math.round(millisecondsSinceEpoch / 1000);
    return secondsSinceEpoch > expiry;
}

type RetrieveTokenArgs = {
    scope: string;
    code?: string;
    refreshToken?: string;
};

export async function retrieveToken({ scope, code, refreshToken }: RetrieveTokenArgs) {
    const formData = new FormData();
    formData.append("client_id", STRAVA_CLIENT_ID);
    formData.append("client_secret", STRAVA_CLIENT_SECRET);
    if (code) {
        formData.append("code", code);
    }

    if (refreshToken) {
        formData.append("refresh_token", refreshToken);
    }

    formData.append("grant_type", refreshToken ? "refresh_token" : "authorization_code");
    const stravaResponse = await fetch(STRAVA_TOKEN_URL, {
        method: "POST",
        body: formData as any,
    });
    const { athlete, ...stravaJson } = await stravaResponse.json();
    return { ...stravaJson, scope };
}

async function refreshAuth(auth: StravaAuth) {
    const { refresh_token: refreshToken, scope } = auth;
    return retrieveToken({ scope, refreshToken });
}

export function withAuth(loader: Loader): Loader {
    return async args => {
        const { request } = args;

        let stravaAuth = getAuth(request);
        if (!stravaAuth) {
            const { path, protocol } = url.parse((request as Request).url);
            const host = request.headers.get("host");
            const session = await getSession(request.headers.get("Cookie"));
            session.set("lastRequestPath", path ?? "/");

            return redirect(
                `${STRAVA_AUTHORISE_URL}?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${protocol}//${host}/auth&response_type=code&approval_prompt=auto&scope=profile:read_all,activity:read_all,activity:write`,
                { headers: { "Set-Cookie": await commitSession(session) } },
            );
        }

        let headers = {};
        if (hasTokenExpired(stravaAuth.expires_at)) {
            stravaAuth = await refreshAuth(stravaAuth);
            headers = { "Set-Cookie": stravaCookie.serialize(stravaAuth) };
        }

        const authContext = stravaAuth
            ? {
                  stravaAuth,
                  headers: { ...headers, Authorization: `Bearer ${stravaAuth.access_token}` },
              }
            : {};

        return loader({
            ...args,
            context: {
                ...args.context,
                ...authContext,
            },
        });
    };
}

export function hasStravaAuth(request: Request) {
    return Boolean(getAuth(request));
}
