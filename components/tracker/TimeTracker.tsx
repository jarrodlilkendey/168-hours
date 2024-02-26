import { Project, TimeEntry } from '@prisma/client'
import TimeTrackerEntryForm from './TimeTrackerEntryForm'
import MyTimeEntries from './MyTimeEntries'

import useSWR from 'swr'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'
import ProjectEntryForm from './ProjectEntryForm'
import SummaryTimeEntries from './SummaryTimeEntries'

export default function TimeTracker() {
    const FIFTEEN_SECONDS = 15 * 1000

    const getMyTrackersViaAPI = async () => {
        const { data } = await axiosInstance.get(`/api/${routes.track}`)
        return data
    }

    const getMyProjectsViaAPI = async () => {
        const { data } = await axiosInstance.get(`/api/${routes.projects}`)
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

    const {
        data: myProjects,
        error: myProjectsError,
        isValidating: myProjectsIsValidating,
    } = useSWR<Project[]>(
        `/api/${routes.projects}`,
        () => getMyProjectsViaAPI(),
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
            <ProjectEntryForm />
            {myProjects && <TimeTrackerEntryForm projects={myProjects} />}
            {myTimeEntries && myProjects && (
                <MyTimeEntries
                    timeEntries={myTimeEntries}
                    projects={myProjects}
                />
            )}
            {myTimeEntries && myProjects && (
                <SummaryTimeEntries
                    timeEntries={myTimeEntries}
                    projects={myProjects}
                />
            )}
        </div>
    )
}
