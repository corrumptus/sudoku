export function numberToTime(seconds: number): string {
    const AMOUNT_SECONDS_MIN = 60;
    const AMOUNT_MINS_HOUR = 60;

    const SECONDS_TO_MINS = 60;
    const MINS_TO_HOURS = 60;

    const times: number[] = [];

    if (seconds <= 0)
        return "00:00";

    times.push(seconds%AMOUNT_SECONDS_MIN);

    const minutes = (seconds - seconds%AMOUNT_SECONDS_MIN) / SECONDS_TO_MINS;

    if (minutes === 0)
        return "00:" + (times[0] < 10 ? "0" + times[0] : times[0]);

    times.push(minutes%AMOUNT_MINS_HOUR);

    const hours = (minutes - minutes%AMOUNT_MINS_HOUR) / MINS_TO_HOURS;

    if (hours !== 0)
        times.push(hours);

    return times.reverse().map(t => t < 10 ? "0" + t : t.toString()).join(":");
}