import type { Mobster } from 'lib/mobsters/types'

export const MobsterDetails = ({ mobster }: { mobster: Mobster }) => (
    <div>
        <h1>{mobster.name}</h1>
        <p>Id: {mobster.id}</p>
    </div>
)
