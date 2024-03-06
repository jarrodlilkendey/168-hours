import useSWR from 'swr'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'
import { Schedule } from '@prisma/client'

const FIFTEEN_SECONDS = 15 * 1000

interface ScheduleProps {
    scheduleId: number
}

const getScheduleViaAPI = async (scheduleId: number) => {
    const { data } = await axiosInstance.get(
        `/api/${routes.schedules}/${scheduleId}`
    )
    return data
}

export const ScheduleComponent = ({ scheduleId }: ScheduleProps) => {
    const {
        data: schedule,
        error,
        isValidating,
    } = useSWR<Schedule>(
        `/api/${routes.schedules}/${scheduleId}`,
        () => getScheduleViaAPI(scheduleId),
        {
            revalidateOnMount: true,
            revalidateOnReconnect: true,
            revalidateOnFocus: true,
            refreshInterval: FIFTEEN_SECONDS,
        }
    )

    console.log({ schedule, error, isValidating })

    return (
        <div>
            <h1>Schedule Name: {schedule?.name}</h1>
            <div className='grid grid-cols-7'>
                {[
                    'Monday',
                    'Tueday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                ].map((day) => (
                    <div key={day}>
                        <h2>{day}</h2>
                        {[
                            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                            15, 16, 17, 18, 19, 20, 21, 22, 23,
                        ].map((slot) => (
                            <div key=''>
                                {slot}:00-{slot}:59
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
