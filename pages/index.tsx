import Link from 'next/link'
import { SignOutButton } from '@/components/nav/SignOutButton'
export default function Home() {
    return (
        <div>
            <h1 className='text-3xl font-bold underline'>168 Hours</h1>
            <ul>
                <li>
                    <Link href='/schedule'>Schedule Your Goals</Link>
                </li>
            </ul>
        </div>
    )
}
