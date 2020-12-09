import type { DataLoader } from "@remix-run/core";
import { hasStravaAuth } from "../auth";

export const loader: DataLoader = async ({ context }) => {
    const { req } = context;
    return {
        isAuthenticated: hasStravaAuth(req),
    };
};
