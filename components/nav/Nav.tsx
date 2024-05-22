import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

import { useSessionStatus } from '@/lib/users/useSessionStatus'
import { routes } from '@/lib/axios/routes'
import MaxWidthWrapper from '../_common/MaxWidthWrapper'
import UserAccountNav from './UserAccountNav'
import MobileNav from '../nav/MobileNav'

export function NavBar() {
    const { isLoading, isLoggedIn } = useSessionStatus()
    const { data: session } = useSession()

    return (
        <nav className='sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href='/' className='z-40 flex font-semibold'>
                        <span>168 Hours</span>
                    </Link>

                    <MobileNav isAuth={session && session.user} />

                    <div className='hidden items-center space-x-4 sm:flex'>
                        {!isLoggedIn || !session || !session.user ? (
                            <>
                                <Link href={routes.login}>Sign in</Link>
                            </>
                        ) : (
                            <>
                                <Link href='/'>Dashboard</Link>

                                <UserAccountNav
                                    name='Your Account'
                                    email={session.user.user.email}
                                    imageUrl={''}
                                />
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
