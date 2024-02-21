import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'

import { Button } from '@/components/ui/button'
import { TimeEntry } from '@prisma/client'
import { useState } from 'react'
import { intervalToDuration } from 'date-fns'

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

export default function MyTimeEntries({ timeEntries }: ComponentProps) {
    return (
        <div className='w-full'>
            {timeEntries.map((timeEntry) => (
                <div key={timeEntry.id} className='flex justify-between'>
                    <div>{timeEntry.label}</div>
                    <div>
                        {
                            intervalToDuration({
                                start: timeEntry.start,
                                end: new Date(),
                            }).seconds
                        }
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
