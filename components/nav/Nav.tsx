import { useSession } from 'next-auth/react'
import React from 'react'

import { routes } from '@/lib/axios/routes'
import { useSessionStatus } from '@/lib/users/useSessionStatus'

import { NavLink } from './NavLink'
import { SignOutButton } from './SignOutButton'

export function NavBar(): React.ReactElement {
    const { isLoading, isLoggedIn } = useSessionStatus()
    const { data: session } = useSession()
    const userName = session?.user?.email ?? 'My Profile'

    const links = [
        { display: 'New Character', route: routes.character },
        { display: 'Mobsters', route: routes.mobsters },
        { display: isLoggedIn ? userName : 'Sign In', route: routes.user },
    ]

    return (
        <div>
            <div>
                <div>
                    <div>
                        <NavLink href='/'>
                            <span>Home</span>
                        </NavLink>
                    </div>
                    <div>
                        {links.map((link) => (
                            <NavLink key={link.display} href={`/${link.route}`}>
                                {link.display}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div>
                    {isLoading && <p>Loading...</p>}
                    <SignOutButton />
                </div>
            </div>
        </div>
    )
}
