import React, { ReactNode } from 'react'

import { NavBar } from '../nav/Nav'
import MaxWidthWrapper from './MaxWidthWrapper'
import { ThemeProvider } from './theme-provider'

interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
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
        </ThemeProvider>
    )
}
