import { Action, json, Loader, parseFormBody, redirect } from "@remix-run/data";
import { withAuth } from "../../../auth";

export const loader: Loader = withAuth(async ({ context: { stravaAuth }, params: { id }, session }) => {
    const headers = { Authorization: `Bearer ${stravaAuth.access_token}` };
    const activities = await fetch(`https://www.strava.com/api/v3/activities/${id}`, { headers });
    const failedUpdate = session.get("failedUpdate");
    return json({ activity: await activities.json(), failedUpdate: failedUpdate ? JSON.parse(failedUpdate) : null });
});

type UpdatedActivity = { name: string; description: string; type: string };
function validateActivity({ name, type }: UpdatedActivity) {
    const errors = {} as any;
    if (!name) {
        errors.activityName = "Name is required";
    }
    if (!type) {
        errors.activityType = "Type is required";
    }

    return errors;
}

async function parseActivity(request: Request) {
    const formBody = await parseFormBody(request);
    const name = (formBody.get("activityName") as string) || "";
    const description = (formBody.get("activityDescription") as string) || "";
    const type = (formBody.get("activityType") as string) || "";

    const activity = { name, description, type };
    return { ...activity, errors: validateActivity(activity) };
}

export const action: Action = withAuth(async ({ request, params: { id }, session, context: { stravaAuth } }) => {
    const { errors, ...activity } = await parseActivity(request);
    if (Object.keys(errors).length) {
        session.flash("failedUpdate", JSON.stringify({ errors, activity }));
        return redirect(`/athlete/activity/${id}/edit`);
    }

    const headers = { Authorization: `Bearer ${stravaAuth.access_token}`, "Content-Type": "application/json" };
    const response = await fetch(`https://www.strava.com/api/v3/activities/${id}`, {
        headers,
        method: "PUT",
        body: JSON.stringify(activity),
    });

    console.log(response.status);
    console.log(response.statusText);
    if (!response.ok) {
        session.flash("failedUpdate", JSON.stringify({ errors: { form: "Form submission failed" }, activity }));
        return redirect(`/athlete/activity/${id}/edit`);
    }

    return redirect(`/athlete/activity/${id}`);
});
