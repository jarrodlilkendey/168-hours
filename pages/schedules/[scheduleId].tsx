import { WeeklySchedule } from '@/components/schedule/WeeklySchedule'

// can i make a better UX than this https://schedulemaker.io/
// list of tasks that can be selected from above to copy and then painted into the schedule by selecting the time slot
// as you paint in time, your schedule calculates a free time remaining

export default function Schedule() {
    return (
        <div>
            <WeeklySchedule />
        </div>
    )
}
