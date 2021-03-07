import { redirect } from "@remix-run/data";
import type { Loader } from "@remix-run/data";
import { retrieveToken } from "../auth";
import { getSession } from "../session";
import { stravaCookie } from "../cookies";

export const loader: Loader = async ({ context, request }) => {
    const {
        req: {
            query: { code, scope },
        },
    } = context;

    const session = await getSession(request.headers.get("Cookie"));
    return redirect(session.get("lastRequestPath") || "/", {
        headers: { "Set-Cookie": stravaCookie.serialize(await retrieveToken({ scope, code })) },
    });
};

export default function Auth() {
    return null;
}
