import React, { ReactNode } from 'react'

import { NavBar } from '../nav/Nav'
import MaxWidthWrapper from './MaxWidthWrapper'
interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => (
    <div>
        <div>
            <NavBar />
        </div>
        <div>
            <MaxWidthWrapper>
                <main>{children}</main>
            </MaxWidthWrapper>
        </div>
    </div>
)
