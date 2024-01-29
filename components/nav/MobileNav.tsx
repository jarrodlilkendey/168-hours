'use client'

import { routes } from '@/lib/axios/routes'
import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navLinks } from '@/lib/nav/routes'

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const toggleOpen = () => setOpen((prev) => !prev)

    const pathname = usePathname()

    useEffect(() => {
        if (isOpen) toggleOpen()
    }, [pathname])

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            toggleOpen()
        }
    }

    return (
        <div className='sm:hidden'>
            <Menu
                onClick={toggleOpen}
                className='relative z-50 h-5 w-5 text-zinc-700'
            />

            {isOpen ? (
                <div className='fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5'>
                    <ul className='absolute grid w-full gap-3 border-b border-zinc-200 bg-secondary px-10 pb-8 pt-20 shadow-xl'>
                        {!isAuth ? (
                            <>
                                <li>
                                    <Link
                                        href={routes.login}
                                        onClick={() =>
                                            closeOnCurrent(`/${routes.login}`)
                                        }
                                        className='flex w-full items-center font-semibold'
                                    >
                                        Sign in
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {navLinks.map((navSection) => (
                                    <>
                                        {navSection.links.map(
                                            (navLink, index) => {
                                                return (
                                                    <li
                                                        key={`nav-mob-${navSection}-${index}`}
                                                    >
                                                        <Link
                                                            onClick={() =>
                                                                closeOnCurrent(
                                                                    `/${navLink.path}`
                                                                )
                                                            }
                                                            className='flex w-full items-center font-semibold'
                                                            href={navLink.path}
                                                        >
                                                            {navLink.label}
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        )}
                                        <li className='my-3 h-px w-full bg-gray-300' />
                                    </>
                                ))}

                                <li>
                                    <Link href='/sign-out'>Log out</Link>
                                </li>
                                <li className='my-3 h-px w-full bg-gray-300' />
                            </>
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default MobileNav
