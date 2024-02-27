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
            let data = []
            for (let day of days) {
                data.push({
                    name: day.label,
                    values: [1000, 2000, 3000],
                })
            }

            // const data = [
            //     {
            //         name: 'Page A',
            //         uv: 4000,
            //         pv: 2400,
            //         amt: 2400,
            //         vars: [1000, 2000, 3000],
            //     },
            //     {
            //         name: 'Page B',
            //         uv: 3000,
            //         pv: 1398,
            //         amt: 2210,
            //         vars: [1000, 2000, 3000],
            //     },
            //     {
            //         name: 'Page C',
            //         uv: 2000,
            //         pv: 9800,
            //         amt: 2290,
            //         vars: [1000, 2000, 3000],
            //     },
            //     {
            //         name: 'Page D',
            //         uv: 2780,
            //         pv: 3908,
            //         amt: 2000,
            //         vars: [1000, 2000, 3000],
            //     },
            //     {
            //         name: 'Page E',
            //         uv: 1890,
            //         pv: 4800,
            //         amt: 2181,
            //         vars: [1000, 2000, 3000],
            //     },
            //     {
            //         name: 'Page F',
            //         uv: 2390,
            //         pv: 3800,
            //         amt: 2500,
            //         vars: [1000, 2000, 3000],
            //     },
            //     {
            //         name: 'Page G',
            //         uv: 3490,
            //         pv: 4300,
            //         amt: 2100,
            //         vars: [1000, 2400, 3000, 0, 1000],
            //     },
            // ]

            const segments = [
                {
                    dataKey: 'values[0]',
                    stackId: 'a',
                    color: '#8884d8',
                    name: 'Project 1',
                },
                {
                    dataKey: 'values[1]',
                    stackId: 'a',
                    color: '#82ca9d',
                    name: 'Project 2',
                },
                {
                    dataKey: 'values[2]',
                    stackId: 'a',
                    color: '#6ff',
                    name: 'Project 3',
                },
                {
                    dataKey: 'values[3]',
                    stackId: 'a',
                    color: '#eff',
                    name: 'Project 4',
                },
                {
                    dataKey: 'values[4]',
                    stackId: 'a',
                    color: '#e3f',
                    name: 'Project 5',
                },
            ]

            filteredSummaryData.dailyTimeByProjectData = data
            filteredSummaryData.dailyTimeByProjectSegments = segments

            for (let timeEntry of filteredTimeEntries) {
                filteredSummaryData.timeEntryCount++
                filteredSummaryData.totalSeconds += durationInSeconds(timeEntry)
                if (
                    timeEntry.projectId &&
                    !filteredSummaryData.uniqueProjects.find(
                        (p) => p.id == timeEntry.projectId
                    )
                ) {
                    filteredSummaryData.uniqueProjects.push({
                        id: timeEntry.projectId,
                        name: projects.find((p) => p.id == timeEntry.projectId)!
                            .name,
                    })
                }
            }

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
            console.log(
                'comparing timeEntry [timeEntry.start, date.from, date.to]',
                timeEntry.start,
                date.from,
                date.to
            )
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

            <div>TODO: daily bar chart color coded by different projects</div>
            {summaryData && (
                <div className='h-[400px]'>
                    <StackedBarChart
                        data={summaryData.dailyTimeByProjectData}
                        segments={summaryData.dailyTimeByProjectSegments}
                    />
                </div>
            )}
            <div>TODO: pie chart color coded by different projects</div>
            {/* https://www.youtube.com/watch?v=eIRqGui1vQc */}
        </div>
    )
}
