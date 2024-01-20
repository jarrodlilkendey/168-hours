/**
 * The MySchedule page will load a list of schedules that the user has created
 * along with a button to create a new schedule
 *
 * Data Fetching: Client Side Rendering (CSR)
 *   - because the data is user specific
 *   - and it does not require SEO
 *
 * Auth is required to access this page
 */

import { MySchedules } from '@/components/schedule/MySchedules'

export default function MySchedulesPage() {
    return (
        <div>
            <MySchedules />
        </div>
    )
}

MySchedulesPage.auth = true
