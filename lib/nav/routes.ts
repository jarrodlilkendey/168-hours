import { routes } from '@/lib/axios/routes'

export const navLinks = [
    {
        section: 'section 1',
        links: [{ label: 'My Schedules', path: routes.schedules }],
    },
    {
        section: 'section 2',
        links: [{ label: 'Another Section Link', path: routes.schedules }],
    },
]
