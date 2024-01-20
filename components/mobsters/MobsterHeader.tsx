import Link from 'next/link'
import type { Mobster } from 'lib/mobsters/types'

export const MobsterHeader = ({ mobster }: { mobster: Mobster }) => (
    <div>
        <Link href={`/mobsters/${mobster.id}`} passHref>
            {mobster.name.toLocaleLowerCase()}
        </Link>
    </div>
)
