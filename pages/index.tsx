import ToolWithLink from '@/components/_common/ToolWithLink'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import useSWR from 'swr'
import { routes } from '@/lib/axios/routes'
import { Tool } from '@/lib/tools/types'

// enable in the future once I get mock service worker 2 working with nextjs
// https://github.com/mswjs/msw/issues/1877
// const getToolsViaAPI = async () => {
//     const { data } = await axiosInstance.get(`/api/${routes.tools}`)
//     return data
// }

export default function Home() {
    // const {
    //     data: tools,
    //     error,
    //     isValidating,
    // } = useSWR<Tool[]>(`/api/${routes.tools}`, () => getToolsViaAPI(), {
    //     revalidateOnMount: true,
    //     revalidateOnReconnect: true,
    //     revalidateOnFocus: true,
    // })
    const tools: Tool[] = [
        {
            name: 'Free Time Calculator',
            link: '/freetime',
            description: 'Calculate how much free time you have in a week',
            testId: 'freetime-tool-card',
        },
        {
            name: 'Time Tracker',
            link: '/track',
            description: 'Track how you actually spend your time',
            testId: 'track-tool-card',
        },
        {
            name: 'Schedule Maker',
            link: '/schedules',
            description: 'Create a weekly schedule',
            testId: 'schedules-tool-card',
        },
        {
            name: 'Habit Tracker',
            link: '/habits',
            description: 'Track your habits over a month',
            testId: 'habits-tool-card',
        },
    ]

    return (
        <div>
            <h1 className='text-3xl font-bold'>168 Hours</h1>
            <h2 className='text-lg font-bold'>
                Time is your most valuable asset
            </h2>
            <ul className='list-disc list-inside'>
                <li>Time is a finite resource</li>
                <li>Money cannot buyback time</li>
                <li>Time cannot be taxed</li>
                <li>Time cannot be inflated away</li>
            </ul>
            <h2 className='text-lg font-bold'>Tools to savour your time</h2>
            <div className='grid grid-cols-2'>
                {tools &&
                    tools.length > 0 &&
                    tools.map((tool) => (
                        <ToolWithLink
                            key={`${tool.name}-${tool.link}`}
                            title={tool.name}
                            description={tool.description}
                            link={tool.link}
                            cypressId={tool.testId}
                        />
                    ))}
            </div>
        </div>
    )
}
