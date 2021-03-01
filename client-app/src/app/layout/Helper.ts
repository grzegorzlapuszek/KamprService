import { AxiosResponse } from "axios";
import { IActivity } from "../../models/activity";

export function ConvertDateFormatFromResponse(response: AxiosResponse<IActivity[]>) : IActivity[] {
    let activities: IActivity[] = [];
    response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
    });
    return activities;
}

