import { Project, TimeEntry } from '@prisma/client'
import { DatePickerWithRange } from '../_common/DatePickerWithRange'
import {
    format,
    subDays,
    startOfDay,
    endOfDay,
    differenceInCalendarDays,
} from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
    formatDurationInSeconds,
    durationInSeconds,
    generateDailyChartProjectBreakdown,
    generateSummaryKeyMetrics,
    generateProjectColors,
    generateProjectTimeBreakdown,
} from '../../lib/timeEntries/utils'

import RechartsStackedBarChart from '../charts/RechartsStackedBarChart'
import RechartsPieChart from '../charts/RechartsPieChart'

import {
    StackedBarChartDataPoint,
    StackedBarChartSegment,
} from '../charts/RechartsStackedBarChart'

import { PieChartDataPoint } from '../charts/RechartsPieChart'

interface ComponentProps {
    timeEntries: TimeEntry[]
    projects: Project[]
}

export interface ProjectData {
    id: number
    name: string
}

export interface DailyTimeByProjectChartBreakdown {
    data: StackedBarChartDataPoint[]
    segments: StackedBarChartSegment[]
}

export interface SummaryKeyMetrics {
    timeEntryCount: number
    uniqueProjects: ProjectData[]
    totalSeconds: number
}

interface SummaryData {
    keyMetrics: SummaryKeyMetrics
    dailyTimeByProjectChartBreakdown: DailyTimeByProjectChartBreakdown
    projectTimeBreakdown: PieChartDataPoint[]
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
                keyMetrics: {
                    timeEntryCount: 0,
                    uniqueProjects: [],
                    totalSeconds: 0,
                },
                dailyTimeByProjectChartBreakdown: { data: [], segments: [] },
                projectTimeBreakdown: [],
            } as SummaryData

            filteredSummaryData.keyMetrics = generateSummaryKeyMetrics(
                filteredTimeEntries,
                projects
            )

            let projectColors = generateProjectColors(
                filteredSummaryData.keyMetrics.uniqueProjects.length + 1
            )

            filteredSummaryData.dailyTimeByProjectChartBreakdown =
                generateDailyChartProjectBreakdown(
                    date.from,
                    date.to,
                    filteredTimeEntries,
                    filteredSummaryData.keyMetrics.uniqueProjects,
                    projectColors
                )

            filteredSummaryData.projectTimeBreakdown =
                generateProjectTimeBreakdown(
                    filteredTimeEntries,
                    filteredSummaryData.keyMetrics.uniqueProjects,
                    projectColors
                )

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

            {summaryData && (
                <div>
                    <h3 className='font-bold'>Summary Data</h3>
                    <div>
                        {date && date.from && date.to ? (
                            <div>
                                Data is filtered by{' '}
                                {format(date.from, 'LLL dd, y')} -{' '}
                                {format(date.to, 'LLL dd, y')} (
                                {differenceInCalendarDays(date.to, date.from) +
                                    1}{' '}
                                days)
                            </div>
                        ) : (
                            <div>Select a date range</div>
                        )}
                    </div>
                    <ul>
                        <li>
                            Time Entry Count:{' '}
                            {summaryData.keyMetrics.timeEntryCount}
                        </li>
                        <li>
                            Unique Project Count:{' '}
                            {summaryData.keyMetrics.uniqueProjects.length}
                        </li>
                        <li>
                            Total Time Tracked:{' '}
                            {formatDurationInSeconds(
                                summaryData.keyMetrics.totalSeconds
                            )}
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
                            <RechartsStackedBarChart
                                data={
                                    summaryData.dailyTimeByProjectChartBreakdown
                                        .data
                                }
                                segments={
                                    summaryData.dailyTimeByProjectChartBreakdown
                                        .segments
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold'>Time By Project</h3>
                        <div className='h-[400px]'>
                            <RechartsPieChart
                                data={summaryData.projectTimeBreakdown}
                                // data={
                                //     summaryData.dailyTimeByProjectChartBreakdown
                                //         .data
                                // }
                                // segments={
                                //     summaryData.dailyTimeByProjectChartBreakdown
                                //         .segments
                                // }
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
