import { Project, TimeEntry } from '@prisma/client'
import { DatePickerWithRange } from '../_common/DatePickerWithRange'
import {
    format,
    subDays,
    startOfDay,
    endOfDay,
    formatDuration,
    formatDistanceStrict,
    formatDistance,
} from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
    formatDurationInSeconds,
    durationInSeconds,
    generateDailyPoints,
} from '../../lib/timeEntries/utils'
import StackedBarChart from '../_common/StackedBarChart'
import {
    StackedBarChartDataPoint,
    StackedBarChartSegment,
} from '../_common/StackedBarChart'

interface ComponentProps {
    timeEntries: TimeEntry[]
    projects: Project[]
}

interface ProjectData {
    id: number
    name: string
}

interface SummaryData {
    timeEntryCount: number
    uniqueProjects: ProjectData[]
    totalSeconds: number
    dailyTimeByProjectData: StackedBarChartDataPoint[]
    dailyTimeByProjectSegments: StackedBarChartSegment[]
}

export default function SummaryTimeEntries({
    timeEntries,
    projects,
}: ComponentProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfDay(subDays(new Date(), 7)),
        to: endOfDay(new Date()),
    })

    useEffect(() => {
        if (date && date.from && date.to) {
            let filteredTimeEntries = filterTimeEntries()

            let filteredSummaryData = {
                timeEntryCount: 0,
                uniqueProjects: [],
                totalSeconds: 0,
                dailyTimeByProjectData: [],
                dailyTimeByProjectSegments: [],
            } as SummaryData

            let days = generateDailyPoints(date.from, date.to)
            let data: StackedBarChartDataPoint[] = []
            for (let day of days) {
                data.push({
                    name: day.label,
                    values: [],
                })
            }

            for (let timeEntry of filteredTimeEntries) {
                filteredSummaryData.timeEntryCount++
                filteredSummaryData.totalSeconds += durationInSeconds(timeEntry)
                if (
                    timeEntry.projectId &&
                    !filteredSummaryData.uniqueProjects.find(
                        (p) => p.id == timeEntry.projectId
                    )
                ) {
                    // project is not in the list
                    filteredSummaryData.uniqueProjects.push({
                        id: timeEntry.projectId,
                        name: projects.find((p) => p.id == timeEntry.projectId)!
                            .name,
                    })
                }
            }

            let projectsList = ['no project']
            for (let project of filteredSummaryData.uniqueProjects) {
                projectsList.push(project.name)
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
                for (let project of [
                    { id: null },
                    ...filteredSummaryData.uniqueProjects,
                ]) {
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

            let colors = ['#8884d8', '#82ca9d', '#6ff', '#eff', '#e3f']
            let segments: StackedBarChartSegment[] = []
            for (let project of [
                { id: null, name: 'no project' },
                ...filteredSummaryData.uniqueProjects,
            ]) {
                segments.push({
                    dataKey: `values[${projectsList.indexOf(project.name)}]`,
                    stackId: 'a',
                    color: colors[projectsList.indexOf(project.name)],
                    name: project.name,
                })
            }

            filteredSummaryData.dailyTimeByProjectData = data
            filteredSummaryData.dailyTimeByProjectSegments = segments

            setSummaryDate(filteredSummaryData)
        }
    }, [date])

    const [summaryData, setSummaryDate] = useState<SummaryData | undefined>()

    function filterTimeEntries() {
        if (date == null || date.from == null || date.to == null) {
            return timeEntries
        }

        let filteredTimeEntries = []

        for (let timeEntry of timeEntries) {
            if (
                new Date(timeEntry.start) >= date.from &&
                new Date(timeEntry.start) <= date.to
            ) {
                filteredTimeEntries.push(timeEntry)
            }
        }

        return filteredTimeEntries
    }

    return (
        <div className='w-full'>
            <h2 className='text-xl font-bold'>Summary</h2>
            <DatePickerWithRange date={date} setDate={setDate} />
            {date && date.from && date.to ? (
                <div>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                </div>
            ) : (
                <div>Select a date range</div>
            )}

            {summaryData && (
                <div>
                    <h3 className='font-bold'>Summary Data</h3>
                    <ul>
                        <li>Time Entry Count: {summaryData.timeEntryCount}</li>
                        <li>
                            Unique Project Count:{' '}
                            {summaryData.uniqueProjects.length}
                        </li>
                        <li>
                            Total Time Tracked:{' '}
                            {formatDurationInSeconds(summaryData.totalSeconds)}
                        </li>
                    </ul>
                </div>
            )}

            {timeEntries.length &&
                filterTimeEntries().map((timeEntry, index) => (
                    <div key={timeEntry.id} className='flex justify-between'>
                        <div>
                            {timeEntry.label}{' '}
                            {timeEntry.projectId != null ? (
                                <span className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
                                    {
                                        projects.find(
                                            (p) => p.id == timeEntry.projectId
                                        )!.name
                                    }
                                </span>
                            ) : (
                                <span className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
                                    no project
                                </span>
                            )}
                        </div>
                        <div>
                            created{' '}
                            {format(new Date(timeEntry.start), 'LLL dd, y')}
                        </div>
                        <div>
                            {timeEntry.end != null ? (
                                <span>
                                    completed{' '}
                                    {format(
                                        new Date(timeEntry.end),
                                        'LLL dd, y'
                                    )}
                                </span>
                            ) : (
                                <span>not completed</span>
                            )}
                        </div>
                        <div>
                            {timeEntry.end != null ? (
                                <span>
                                    {formatDurationInSeconds(
                                        durationInSeconds(timeEntry)
                                    )}
                                </span>
                            ) : (
                                <span>not completed</span>
                            )}
                        </div>
                    </div>
                ))}

            {summaryData && (
                <div className='columns-1'>
                    <div>
                        <h3 className='font-bold'>
                            Daily Time Spent By Project
                        </h3>
                        <div className='h-[400px]'>
                            <StackedBarChart
                                data={summaryData.dailyTimeByProjectData}
                                segments={
                                    summaryData.dailyTimeByProjectSegments
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold'>Time By Project</h3>
                        <div className='h-[400px]'>
                            <StackedBarChart
                                data={summaryData.dailyTimeByProjectData}
                                segments={
                                    summaryData.dailyTimeByProjectSegments
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
