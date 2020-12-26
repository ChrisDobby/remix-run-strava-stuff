export type StravaAthlete = {
    firstname: string;
    lastname: string;
    profile: string;
};

export type StravaAthleteStats = {
    recent_run_totals: {
        distance: number;
    };
    recent_ride_totals: {
        distance: number;
    };
    recent_swim_totals: {
        distance: number;
    };
};

export type ActivityType = "Run" | "Ride" | "Swim";
export type StravaActivitySummary = {
    id: number;
    name: string;
    type: ActivityType;
    start_date_local: string;
    distance: number;
    moving_time: number;
    total_elevation_gain: number;
};

export type StravaActivitySplit = {
    split: number;
    moving_time: number;
    elevation_difference: number;
    average_speed: number;
    average_heartrate: number;
};
export type StravaActivity = StravaActivitySummary & {
    average_speed: number;
    max_speed: number;
    has_heartrate: boolean;
    average_heartrate: number;
    max_heartrate: number;
    elev_high: number;
    elev_low: number;
    suffer_score: number;
    splits_metric: StravaActivitySplit[];
};
