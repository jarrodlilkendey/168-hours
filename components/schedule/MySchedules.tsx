import type { Schedule } from '@/lib/schedules/types'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'
import Link from 'next/link'

const FIFTEEN_SECONDS = 15 * 1000

const getSchedulesViaAPI = async () => {
    const { data } = await axiosInstance.get(`/api/${routes.schedules}`)
    return data
}

const createScheduleViaAPI = async () => {
    const { data } = await axiosInstance.post(`/api/${routes.schedules}`, {
        name: 'New Schedule',
        userId: 1,
    })
    return data
}

export const MySchedules = () => {
    // const { data: session, status } = useSession()
    // if (!session?.user.user.email) return <p>Loading...</p>

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

    console.log({ schedules, error, isValidating })

    return (
        <div>
            <h1 className='text-3xl font-bold'>My Schedules</h1>
            {/* <p>{session!.user.user.email}</p> */}
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
