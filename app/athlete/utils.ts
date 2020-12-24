const METRES_IN_KM = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

function to2Decimals(num: number) {
    return Math.round(num * 100 + Number.EPSILON) / 100;
}

function fractionToPartOfTime(fraction: number) {
    return to2Decimals(Math.trunc(fraction * SECONDS_IN_MINUTE));
}

function addLeadingZero(num: number) {
    if (num >= 10) {
        return num.toString();
    }

    return `0${num}`;
}

export function timeFromSeconds(seconds: number) {
    const minutes = seconds / SECONDS_IN_MINUTE;
    const hours = minutes / MINUTES_IN_HOUR;
    const fractionSeconds = addLeadingZero(fractionToPartOfTime(minutes % 1));
    if (hours >= 1) {
        return `${Math.trunc(hours)}:${addLeadingZero(fractionToPartOfTime(hours % 1))}:${fractionSeconds} hrs`;
    }

    return `${Math.trunc(minutes)}:${fractionSeconds} mins`;
}

export function distanceInKm(distanceInMetres: number) {
    return `${to2Decimals(distanceInMetres / METRES_IN_KM)} km`;
}

export function calculateSpeedAndPace(metresPerSecond: number) {
    const metresPerHour = metresPerSecond * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
    const kmPerHour = metresPerHour / METRES_IN_KM;
    const secondsPerKm = METRES_IN_KM / metresPerSecond;
    return [`${to2Decimals(kmPerHour)} km/hour`, `${timeFromSeconds(secondsPerKm)}/km`];
}
