import React, { ReactNode } from 'react'

import { NavBar } from '../nav/Nav'

interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => (
    <div>
        <div>
            <NavBar />
        </div>
        <div>
            <main>{children}</main>
        </div>
    </div>
)
