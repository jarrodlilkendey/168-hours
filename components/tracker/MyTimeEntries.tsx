import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'

import { Button } from '@/components/ui/button'
import { Project, TimeEntry } from '@prisma/client'
import { useState } from 'react'
import { useEffect } from 'react'
import {
    durationActiveTimerInSeconds,
    formatDurationInSeconds,
} from '@/lib/timeEntries/utils'

const deleteTimerEntryViaAPI = async ({
    timeEntryId,
}: {
    timeEntryId: number
}) => {
    const { data } = await axiosInstance.post(
        `/api/${routes.track}/${timeEntryId}`,
        {
            timerStatus: 'delete',
        }
    )
    return data
}

const stopTimerEntryViaAPI = async ({
    timeEntryId,
}: {
    timeEntryId: number
}) => {
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
    projects: Project[]
}

interface Counter {
    seconds: number
}

export default function MyTimeEntries({
    timeEntries,
    projects,
}: ComponentProps) {
    const [timeCounters, setTimeCounters] = useState<Counter[]>([])

    function updateCounters() {
        let newCounters: Counter[] = []
        timeEntries.forEach((timeEntry) => {
            let comparisonDate = new Date()
            if (timeEntry.end != null) comparisonDate = new Date(timeEntry.end)

            let counter: Counter = {
                seconds: durationActiveTimerInSeconds(
                    timeEntry,
                    comparisonDate
                ),
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
                            {formatDurationInSeconds(
                                timeCounters[index].seconds
                            )}
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
