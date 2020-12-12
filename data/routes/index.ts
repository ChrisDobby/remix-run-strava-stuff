import type { Loader } from "@remix-run/data";
import { hasStravaAuth } from "../auth";

export const loader: Loader = async ({ context }) => {
    const { req } = context;
    return {
        isAuthenticated: hasStravaAuth(req),
    };
};
