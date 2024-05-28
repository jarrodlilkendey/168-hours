import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'
import Link from 'next/link'
import { Schedule } from '@prisma/client'

const FIFTEEN_SECONDS = 15 * 1000

const getSchedulesViaAPI = async () => {
    const { data } = await axiosInstance.get(`/api/${routes.schedules}`)
    return data
}

const createScheduleViaAPI = async () => {
    const { data } = await axiosInstance.post(`/api/${routes.schedules}`, {
        name: 'New Schedule',
    })
    return data
}

export const MySchedules = () => {
    const {
        data: schedules,
        error,
        isValidating,
    } = useSWR<Schedule[]>(
        `/api/${routes.schedules}`,
        () => getSchedulesViaAPI(),
        {
            revalidateOnMount: true,
            revalidateOnReconnect: true,
            revalidateOnFocus: true,
            refreshInterval: FIFTEEN_SECONDS,
        }
    )

    return (
        <div>
            <h1 className='text-3xl font-bold'>My Schedules</h1>
            <div className=''>
                {schedules?.map((schedule) => (
                    <div key={schedule.id}>
                        <Link href={`/schedules/${schedule.id}`} passHref>
                            <h2>{schedule.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>

            <Button onClick={() => createScheduleViaAPI()}>
                Create a Schedule
            </Button>
        </div>
    )
}
