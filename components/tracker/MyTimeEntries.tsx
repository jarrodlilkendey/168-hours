import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'

import { Button } from '@/components/ui/button'
import { TimeEntry } from '@prisma/client'
import { useState } from 'react'
import { intervalToDuration } from 'date-fns'
import { useEffect } from 'react'

const deleteTimerEntryViaAPI = async ({ timeEntryId }) => {
    const { data } = await axiosInstance.post(
        `/api/${routes.track}/${timeEntryId}`,
        {
            timerStatus: 'delete',
        }
    )
    return data
}

const stopTimerEntryViaAPI = async ({ timeEntryId }) => {
    const { data } = await axiosInstance.post(
        `/api/${routes.track}/${timeEntryId}`,
        {
            timerStatus: 'stop',
        }
    )
    return data
}

interface ComponentProps {
    timeEntries: TimeEntry[]
}

interface Counter {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export default function MyTimeEntries({ timeEntries }: ComponentProps) {
    const [timeCounters, setTimeCounters] = useState<Counter[]>([])

    function updateCounters() {
        let newCounters: Counter[] = []
        timeEntries.forEach((timeEntry) => {
            let comparisonDate = new Date()
            if (timeEntry.end != null) comparisonDate = new Date(timeEntry.end)

            let counter: Counter = {
                days:
                    intervalToDuration({
                        start: timeEntry.start,
                        end: comparisonDate,
                    }).days || 0,
                hours:
                    intervalToDuration({
                        start: timeEntry.start,
                        end: comparisonDate,
                    }).hours || 0,
                minutes:
                    intervalToDuration({
                        start: timeEntry.start,
                        end: comparisonDate,
                    }).minutes || 0,
                seconds:
                    intervalToDuration({
                        start: timeEntry.start,
                        end: comparisonDate,
                    }).seconds || 0,
            }

            newCounters.push(counter)
        })

        setTimeCounters(newCounters)
    }

    useEffect(() => {
        const interval = setInterval(() => updateCounters(), 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className='w-full'>
            {timeEntries.length == timeCounters.length &&
                timeEntries.map((timeEntry, index) => (
                    <div key={timeEntry.id} className='flex justify-between'>
                        <div>{timeEntry.label}</div>
                        <div>
                            {timeCounters[index].days}d{' '}
                            {timeCounters[index].hours}h{' '}
                            {timeCounters[index].minutes}m{' '}
                            {timeCounters[index].seconds}s{' '}
                        </div>
                        {timeEntry.end == null ? (
                            <Button
                                onClick={() =>
                                    stopTimerEntryViaAPI({
                                        timeEntryId: timeEntry.id,
                                    })
                                }
                            >
                                Stop
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    deleteTimerEntryViaAPI({
                                        timeEntryId: timeEntry.id,
                                    })
                                }
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                ))}
        </div>
    )
}
