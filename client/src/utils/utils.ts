export function numberToTime(seconds: number): string {
    const AMOUNT_SECONDS_MIN = 60;
    const AMOUNT_MINS_HOUR = 60;

    const SECONDS_TO_MINS = 60;
    const MINS_TO_HOURS = 60;

    const times: number[] = [];

    if (seconds <= 0)
        return "00:00";

    times.push(seconds%AMOUNT_SECONDS_MIN);

    seconds -= seconds%AMOUNT_SECONDS_MIN;

    if (seconds === 0)
        return "00:" + times[0];

    seconds /= SECONDS_TO_MINS;

    times.push(seconds%AMOUNT_MINS_HOUR);

    seconds -= seconds%AMOUNT_MINS_HOUR;

    seconds /= MINS_TO_HOURS;

    if (seconds !== 0)
        times.push(seconds);

    return times.reverse().join(":");
}

/*
 - 1: 1s

 - 60: 1min

 - 61: 1min 1s

 - 3600: 1h

 - 3601: 1h 1s

 - 3661: 1h 1min 1s



*/