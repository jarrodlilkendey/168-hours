import Link from 'next/link'
import React from 'react'

interface NavLinkProps {
    href: string
    children: React.ReactElement | string
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
    <Link href={href} passHref>
        <button>{children}</button>
    </Link>
)
