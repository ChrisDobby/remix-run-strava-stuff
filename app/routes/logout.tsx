import { redirect } from "@remix-run/data";
import type { Loader } from "@remix-run/data";
import { stravaCookie } from "../cookies";

export const loader: Loader = async () => {
    return redirect("/", { headers: { "Set-Cookie": stravaCookie.serialize(null) } });
};

export default function Logout() {
    return null;
}
