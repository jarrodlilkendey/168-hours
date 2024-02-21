import { TimeEntry } from '@prisma/client'
import TimeTrackerEntryForm from './TimeTrackerEntryForm'
import MyTimeEntries from './MyTimeEntries'

import useSWR from 'swr'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'

export default function TimeTracker() {
    const FIFTEEN_SECONDS = 15 * 1000

    const getMyTrackersViaAPI = async () => {
        const { data } = await axiosInstance.get(`/api/${routes.track}`)
        return data
    }

    const {
        data: myTimeEntries,
        error,
        isValidating,
    } = useSWR<TimeEntry[]>(
        `/api/${routes.track}`,
        () => getMyTrackersViaAPI(),
        {
            revalidateOnMount: true,
            revalidateOnReconnect: true,
            revalidateOnFocus: true,
            refreshInterval: FIFTEEN_SECONDS,
        }
    )

    return (
        <div>
            <h1 className='text-3xl font-bold'>Time Tracker</h1>
            <TimeTrackerEntryForm />
            {myTimeEntries && <MyTimeEntries timeEntries={myTimeEntries} />}
        </div>
    )
}
