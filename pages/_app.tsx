import '@/styles/global.css'
import { SessionProvider } from 'next-auth/react'
import type { NextComponentType } from 'next/types'
import type { AppInitialProps } from 'next/app'
import type { Router } from 'next/router'
import { Auth } from '@/components/auth/Auth'
import { Layout } from '@/components/_common/Layout'

type ComponentWithAuth = NextComponentType & { auth: boolean }
interface AppPropsWithAuth extends AppInitialProps {
    Component: ComponentWithAuth
    router: Router
}

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
    return (
        <SessionProvider session={session}>
            <Layout>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}
            </Layout>
        </SessionProvider>
    )
}
