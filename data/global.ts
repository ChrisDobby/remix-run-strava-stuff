import type { Loader } from "@remix-run/data";

export const loader: Loader = async () => {
    return {
        date: new Date(),
    };
};
