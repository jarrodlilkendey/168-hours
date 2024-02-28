import { TimeEntry } from '@prisma/client'
import {
    differenceInSeconds,
    intervalToDuration,
    addDays,
    startOfDay,
    endOfDay,
} from 'date-fns'

import {
    DailyTimeByProjectChartBreakdown,
    SummaryKeyMetrics,
} from '../../components/tracker/SummaryTimeEntries'
import { ProjectData } from '../../components/tracker/SummaryTimeEntries'
import {
    StackedBarChartDataPoint,
    StackedBarChartSegment,
} from '@/components/charts/RechartsStackedBarChart'
import { PieChartDataPoint } from '@/components/charts/RechartsPieChart'

import { Project } from '@prisma/client'

export interface DayPoints {
    label: string
    startOfDayDate: Date
    endOfDayDate: Date
}

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

export function generateSummaryKeyMetrics(
    filteredTimeEntries: TimeEntry[],
    projects: Project[]
): SummaryKeyMetrics {
    let filteredSummaryData = {
        timeEntryCount: 0,
        uniqueProjects: [],
        totalSeconds: 0,
    } as SummaryKeyMetrics

    for (let timeEntry of filteredTimeEntries) {
        filteredSummaryData.timeEntryCount++
        filteredSummaryData.totalSeconds += durationInSeconds(timeEntry)
        if (
            timeEntry.projectId &&
            !filteredSummaryData.uniqueProjects.find(
                (p) => p.id == timeEntry.projectId
            )
        ) {
            // project is not in the list, add it to the list
            filteredSummaryData.uniqueProjects.push({
                id: timeEntry.projectId,
                name: projects.find((p) => p.id == timeEntry.projectId)!.name,
            })
        }
    }

    return filteredSummaryData
}

export function generateDayChartLabels(from: Date, to: Date): DayPoints[] {
    let dayPoints: DayPoints[] = []

    for (let date = from; date <= to; date = addDays(date, 1)) {
        dayPoints.push({
            label: date.toLocaleDateString('en-GB'),
            startOfDayDate: startOfDay(date),
            endOfDayDate: endOfDay(date),
        })
    }
    return dayPoints
}

export function generateDailyChartProjectBreakdown(
    dateFrom: Date,
    dateTo: Date,
    filteredTimeEntries: TimeEntry[],
    uniqueProjects: ProjectData[],
    projectColors: string[]
): DailyTimeByProjectChartBreakdown {
    let days = generateDayChartLabels(dateFrom, dateTo)
    let data: StackedBarChartDataPoint[] = []
    for (let day of days) {
        data.push({
            name: day.label,
            values: [],
        })
    }

    // for each day
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        let day = days[dayIndex]

        // get the time entries for that day
        let dayTimeEntries = filteredTimeEntries.filter(
            (timeEntry) =>
                new Date(timeEntry.start).toLocaleDateString('en-GB') ==
                day.label
        )

        // tally up the duration for each project on that day
        for (let project of [{ id: null }, ...uniqueProjects]) {
            let projectTimeEntries = dayTimeEntries.filter(
                (timeEntry) => timeEntry.projectId == project.id
            )
            let duration = 0
            for (let timeEntry of projectTimeEntries) {
                duration += durationInSeconds(timeEntry)
            }
            data[dayIndex].values.push(duration)
        }
    }

    let projectsList = ['no project']
    for (let project of uniqueProjects) {
        projectsList.push(project.name)
    }

    let segments: StackedBarChartSegment[] = []
    for (let project of [{ id: null, name: 'no project' }, ...uniqueProjects]) {
        segments.push({
            dataKey: `values[${projectsList.indexOf(project.name)}]`,
            stackId: 'a',
            color: projectColors[projectsList.indexOf(project.name)],
            name: project.name,
        })
    }

    return {
        data,
        segments,
    }
}

export function generateProjectColors(projectCount: number): string[] {
    let colors = ['#8884d8', '#82ca9d', '#6ff', '#eff', '#e3f']
    return colors
}

export function generateProjectTimeBreakdown(
    filteredTimeEntries: TimeEntry[],
    uniqueProjects: ProjectData[],
    projectColors: string[]
): PieChartDataPoint[] {
    let projectsList = ['no project']
    for (let project of uniqueProjects) {
        projectsList.push(project.name)
    }

    let data: PieChartDataPoint[] = []
    for (let project of [{ id: null, name: 'no project' }, ...uniqueProjects]) {
        let projectTimeEntries = filteredTimeEntries.filter(
            (timeEntry) => timeEntry.projectId == project.id
        )
        let duration = 0
        for (let timeEntry of projectTimeEntries) {
            duration += durationInSeconds(timeEntry)
        }
        data.push({
            name: project.name,
            value: duration,
            fill: projectColors[projectsList.indexOf(project.name)],
        })
    }

    return data

    // let days = generateDayChartLabels(dateFrom, dateTo)
    // let data: StackedBarChartDataPoint[] = []
    // for (let day of days) {
    //     data.push({
    //         name: day.label,
    //         values: [],
    //     })
    // }

    // // for each day
    // for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
    //     let day = days[dayIndex]

    //     // get the time entries for that day
    //     let dayTimeEntries = filteredTimeEntries.filter(
    //         (timeEntry) =>
    //             new Date(timeEntry.start).toLocaleDateString('en-GB') ==
    //             day.label
    //     )

    //     // tally up the duration for each project on that day
    //     for (let project of [{ id: null }, ...uniqueProjects]) {
    //         let projectTimeEntries = dayTimeEntries.filter(
    //             (timeEntry) => timeEntry.projectId == project.id
    //         )
    //         let duration = 0
    //         for (let timeEntry of projectTimeEntries) {
    //             duration += durationInSeconds(timeEntry)
    //         }
    //         data[dayIndex].values.push(duration)
    //     }
    // }

    // let projectsList = ['no project']
    // for (let project of uniqueProjects) {
    //     projectsList.push(project.name)
    // }

    // let segments: StackedBarChartSegment[] = []
    // for (let project of [{ id: null, name: 'no project' }, ...uniqueProjects]) {
    //     segments.push({
    //         dataKey: `values[${projectsList.indexOf(project.name)}]`,
    //         stackId: 'a',
    //         color: projectColors[projectsList.indexOf(project.name)],
    //         name: project.name,
    //     })
    // }

    // return {
    //     data,
    //     segments,
    // }
}
