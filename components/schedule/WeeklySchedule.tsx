import type { Schedule } from 'lib/schedule/types'
import { Button } from '@/components/ui/button'

export const WeeklySchedule = ({ schedule }: { schedule: Schedule }) => (
    <div>
        <h1>Weekly Schedule</h1>
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
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20, 21, 22, 23,
                    ].map((slot) => (
                        <div key=''>
                            {slot}:00-{slot}:59
                        </div>
                    ))}
                </div>
            ))}
        </div>

        <Button>Click me</Button>
    </div>
)
