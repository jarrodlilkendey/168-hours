import { useRouter } from 'next/router'
import { ScheduleComponent } from '@/components/schedule/Schedule'

export const WeeklySchedule = () => {
    const router = useRouter()
    const { scheduleId } = router.query

    return (
        <div>
            <h1>Weekly Schedule</h1>
            <ScheduleComponent scheduleId={Number(scheduleId)} />
        </div>
    )
}
