import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <h1 className='text-3xl font-bold'>168 Hours</h1>
            <h2 className='text-lg font-bold'>
                Time is your most valuable asset
            </h2>
            <ul>
                <li>Time is finite</li>
                <li>There are no mulligans</li>
                <li>Money cannot buyback time</li>
                <li>Time cannot be taxed</li>
                <li>Time cannot be inflated away or debased</li>
            </ul>
            <h2 className='text-lg font-bold'>Tools to savour your time</h2>
            <ul>
                <li>
                    <Link href='/freetime'>
                        Free time calculator: calculate how much free time you
                        have in a week
                    </Link>
                </li>
                <li>
                    <Link href='/timetracker'>
                        Time Tracker: track how you actually spend your time
                    </Link>
                </li>
                <li>
                    <Link href='/schedulemaker'>
                        Schedule maker: create a weekly schedule
                    </Link>
                </li>
            </ul>
        </div>
    )
}
