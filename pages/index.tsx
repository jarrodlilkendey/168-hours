import ToolWithLink from '@/components/_common/ToolWithLink'

const tools = [
    {
        name: 'Free Time Calculator',
        link: '/freetime',
        description: 'Calculate how much free time you have in a week',
        cypressId: 'freetime-tool-card',
    },
    {
        name: 'Time Tracker',
        link: '/track',
        description: 'Track how you actually spend your time',
        cypressId: 'track-tool-card',
    },
    {
        name: 'Schedule Maker',
        link: '/schedules',
        description: 'Create a weekly schedule',
        cypressId: 'schedules-tool-card',
    },
    {
        name: 'Habit Tracker',
        link: '/habits',
        description: 'Track your habits over a month',
        cypressId: 'habits-tool-card',
    },
]

export default function Home() {
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
                {tools.map((tool) => (
                    <ToolWithLink
                        key={`${tool.name}-${tool.link}`}
                        title={tool.name}
                        description={tool.description}
                        link={tool.link}
                        cypressId={tool.cypressId}
                    />
                ))}
            </div>
        </div>
    )
}
