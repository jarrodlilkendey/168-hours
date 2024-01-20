import { getMobsterById, getMobsters } from '@/lib/prisma/queries/mobsters'
import type { Mobster } from '@/lib/mobsters/types'

import { MobsterDetails } from '@/components/mobsters/MobsterDetails'

// SSG reference:
// https://nextjs.org/docs/basic-features/pages#scenario-2-your-page-paths-depend-on-external-data

export async function getStaticProps({
    params,
}: {
    params: { mobsterId: number }
}) {
    const { mobsterId } = params
    let mobster = null
    let error = null
    try {
        // for SSG, talk directly to db (no need to go through API)
        mobster = await getMobsterById(Number(mobsterId))
    } catch (e) {
        if (e instanceof Error) error = e.message
        if (e && typeof e === 'object' && 'toString' in e) error = e.toString()
    }
    return { props: { mobster, error } }
}

export async function getStaticPaths() {
    const mobsters = await getMobsters()

    const paths = mobsters.map((mobster: Mobster) => ({
        params: { mobsterId: mobster.id.toString() },
    }))

    // Pre-render only these paths at build time.
    // { fallback: blocking } means pages for other paths
    //    get generated at request time (SSR).
    return { paths, fallback: 'blocking' }
}

export default function MobsterPage({
    mobster,
    error,
}: {
    mobster: Mobster | null
    error: string | null
}): React.ReactElement {
    if (error) return <p>{`Could not retrieve mobster data: ${error}`}</p>

    return (
        <div>
            {!mobster ? (
                <p>Loading...</p>
            ) : (
                <MobsterDetails mobster={mobster} />
            )}
        </div>
    )
}
