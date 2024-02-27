import { TimeEntry } from '@prisma/client'
import { differenceInSeconds, intervalToDuration } from 'date-fns'

export function durationInSeconds(timeEntry: TimeEntry): number {
    if (timeEntry.end == null) {
        return 0
    }

    return differenceInSeconds(
        new Date(timeEntry.end),
        new Date(timeEntry.start)
    )
}

export function durationActiveTimerInSeconds(
    timeEntry: TimeEntry,
    comparisonDate: Date
): number {
    return differenceInSeconds(comparisonDate, new Date(timeEntry.start))
}

export function formatDurationInSeconds(durationInSeconds: number): string {
    const duration = intervalToDuration({
        start: 0,
        end: durationInSeconds * 1000,
    })

    const zeroPad = (num: number) => String(num).padStart(2, '0')

    let daysHoursMinutesSeconds = []

    if (duration.days) {
        daysHoursMinutesSeconds.push(duration.days)
    } else {
        daysHoursMinutesSeconds.push(0)
    }

    if (duration.hours) {
        daysHoursMinutesSeconds.push(duration.hours)
    } else {
        daysHoursMinutesSeconds.push(0)
    }

    if (duration.minutes) {
        daysHoursMinutesSeconds.push(duration.minutes)
    } else {
        daysHoursMinutesSeconds.push(0)
    }

    if (duration.seconds) {
        daysHoursMinutesSeconds.push(duration.seconds)
    } else {
        daysHoursMinutesSeconds.push(0)
    }

    const formatted = daysHoursMinutesSeconds.map(zeroPad).join(':')

    return formatted
}
