import { redirect } from "@remix-run/data";
import type { Loader } from "@remix-run/data";
import { removeTokenCookie } from "../auth";

export const loader: Loader = async ({ context, session }) => {
    const { res } = context;
    removeTokenCookie(res);
    return redirect("/");
};

export default function Logout() {
    return null;
}
