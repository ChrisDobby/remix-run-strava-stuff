import { redirect } from "@remix-run/data";
import type { Loader } from "@remix-run/data";
import { setTokenCookie } from "../auth";
import { getSession } from "../session";

export const loader: Loader = async ({ context, request }) => {
    const {
        req: {
            query: { code, scope },
        },
        res,
    } = context;
    await setTokenCookie({ code, scope, res });
    const session = await getSession(request.headers.get("Cookie"));
    return redirect(session.get("lastRequestPath") || "/");
};

export default function Auth() {
    return null;
}
