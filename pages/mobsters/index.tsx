import React from 'react'

import { getMobsters } from '@/lib/prisma/queries/mobsters'
import type { Mobster } from '@/lib/mobsters/types'

import { MobsterHeader } from 'components/mobsters/MobsterHeader'

// ISR reference
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

export async function getStaticProps() {
    const isrMobsters = await getMobsters()

    return {
        props: { isrMobsters },
    }
}

export default function Mobsters({
    isrMobsters,
}: {
    isrMobsters: Array<Mobster>
}): React.ReactElement {
    return (
        <div>
            <h1>Mobsters</h1>
            {isrMobsters.map((mobster) => (
                <MobsterHeader mobster={mobster} key={mobster.id} />
            ))}
        </div>
    )
}
