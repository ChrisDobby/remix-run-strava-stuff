import { redirect } from "@remix-run/data";
import type { Loader } from "@remix-run/data";
import { setTokenCookie } from "../auth";

export const loader: Loader = async ({ context, session }) => {
    const {
        req: {
            query: { code, scope },
        },
        res,
    } = context;
    await setTokenCookie({ code, scope, res });
    return redirect(session.get("lastRequestPath") || "/");
};

export default function Auth() {
    return null;
}
