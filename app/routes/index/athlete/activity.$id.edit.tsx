import * as React from "react";
import { Form, usePendingFormSubmit } from "@remix-run/react";
import { useRouteData } from "@remix-run/react";
import { ActivityHeader } from "../../../athlete";
import { StravaActivity } from "../../../types";
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

function ValidationMessage({ errorMessage, isPending }: { errorMessage?: string; isPending?: boolean }) {
    const [show, setShow] = React.useState(!!errorMessage);

    React.useEffect(() => {
        requestAnimationFrame(() => {
            let hasError = !!errorMessage;
            setShow(hasError && !isPending);
        });
    }, [errorMessage, isPending]);

    return (
        <div
            style={{
                opacity: show ? 1 : 0,
                height: show ? "1em" : 0,
                color: "red",
                transition: "all 300ms ease-in-out",
            }}
        >
            {errorMessage}
        </div>
    );
}

export default function EditActivity() {
    const { activity, failedUpdate } = useRouteData();
    const pendingForm = usePendingFormSubmit();
    const borderStyleForField = (fieldName: string) => ({
        borderColor: failedUpdate?.errors?.[fieldName] ? "red" : "",
    });
    return (
        <div className="p-2">
            <Form method="post">
                <ActivityHeader activity={activity} />
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <ValidationMessage errorMessage={failedUpdate?.errors?.form} isPending={!!pendingForm} />
                        <div>
                            <label htmlFor="activityName" className="block text-sm font-medium text-gray-700">
                                Activity name
                            </label>
                            <input
                                id="activityName"
                                type="text"
                                name="activityName"
                                defaultValue={failedUpdate ? failedUpdate.activity.name : activity.name}
                                className="shadow-sm mt-1 w-full border border-gray-300 rounded-md pt-2 pr-3 pb-2 pl-3 text-sm"
                                placeholder="Activity name"
                                disabled={!!pendingForm}
                                style={borderStyleForField("activityName")}
                            />
                            <ValidationMessage
                                errorMessage={failedUpdate?.errors?.activityName}
                                isPending={!!pendingForm}
                            />
                        </div>
                        <div>
                            <label htmlFor="activityDescription" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="activityDescription"
                                    name="activityDescription"
                                    rows={3}
                                    placeholder="Activity description"
                                    className="shadow-sm border mt-1 block w-full sm:text-sm border-gray-300 rounded-md pt-2 pr-3 pb-2 pl-3 text-sm"
                                    disabled={!!pendingForm}
                                    defaultValue={
                                        failedUpdate ? failedUpdate.activity.description : activity.description
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country / Region
                            </label>
                            <select
                                id="activityType"
                                name="activityType"
                                disabled={!!pendingForm}
                                defaultValue={failedUpdate ? failedUpdate.activity.type : activity.type}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                style={borderStyleForField("activityType")}
                            >
                                <option>Run</option>
                                <option>Ride</option>
                                <option>Swim</option>
                            </select>
                            <ValidationMessage
                                errorMessage={failedUpdate?.errors?.activityType}
                                isPending={!!pendingForm}
                            />
                        </div>
                        <div className="px-4 py-3 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={!!pendingForm}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export function meta({
    data,
    parentsData,
}: {
    data: { activity: StravaActivity };
    parentsData: { [name: string]: any };
}) {
    const { athlete } = parentsData["routes/index/athlete"];
    const { activity } = data;
    return {
        title: `${athlete.firstname} ${athlete.lastname} | ${activity.name} | Edit`,
    };
}