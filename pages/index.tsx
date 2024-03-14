import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <h1 className='text-3xl font-bold'>168 Hours</h1>
            <h2 className='text-lg font-bold'>
                Time is your most valuable asset
            </h2>
            <ul>
                <li>Simple website change</li>
                <li>Time is finite</li>
                <li>There are no mulligans</li>
                <li>Money cannot buyback time</li>
                <li>Time cannot be taxed</li>
                <li>Time cannot be inflated away or debased</li>
            </ul>
            <h2 className='text-lg font-bold'>Tools to savour your time</h2>
            <div className='grid grid-cols-3'>
                <div>
                    <div>
                        <h3 className='text-base font-bold'>
                            Free Time Calculator
                        </h3>
                    </div>
                    <div className='mb-4'>
                        Calculate how much free time you have in a week
                    </div>
                    <div>
                        <Link
                            href='/freetime'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Try It
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className='text-base font-bold'>Time Tracker</h3>
                    </div>
                    <div className='mb-4'>
                        Track how you actually spend your time
                    </div>
                    <div>
                        <Link
                            href='/track'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Try It
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className='text-base font-bold'>Schedule Maker</h3>
                    </div>
                    <div className='mb-4'>Create a weekly schedule</div>
                    <div>
                        <Link
                            href='/schedules'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Try It
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className='text-base font-bold'>Habit Tracker</h3>
                    </div>
                    <div className='mb-4'>Track your habits over a month</div>
                    <div>
                        <Link
                            href='/habits'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Try It
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
