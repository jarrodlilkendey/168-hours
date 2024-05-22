import { routes } from '@/lib/axios/routes'

export const navLinks = [
    {
        section: 'section 1',
        links: [{ label: 'Free Time Calculator', path: routes.freetime }],
    },
    {
        section: 'section 2',
        links: [
            { label: 'Time Tracker', path: routes.track },
            { label: 'Schedule Maker', path: routes.schedules },
            { label: 'Habit Tracker', path: routes.habits },
        ],
    },
]
