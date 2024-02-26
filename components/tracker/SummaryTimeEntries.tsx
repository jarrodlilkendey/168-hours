import { Project, TimeEntry } from '@prisma/client'
import { DatePickerWithRange } from '../_common/DatePickerWithRange'
import { format, subDays, startOfDay, endOfDay } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { time } from 'console'

interface ComponentProps {
    timeEntries: TimeEntry[]
    projects: Project[]
}

export default function SummaryTimeEntries({
    timeEntries,
    projects,
}: ComponentProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfDay(subDays(new Date(), 7)),
        to: endOfDay(new Date()),
    })

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
                    </div>
                ))}
        </div>
    )
}
