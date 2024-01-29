import { useSession } from 'next-auth/react'

// data strategy: Client-Side Rendering with SWR (within UserReservations component)
// (static pages or ISR doesn't make sense; only one user is using this page!
// no advantage to caching.)
// Why not SSR? no need for SEO either, esp since it's behind auth barrier!
//    plus SSR is slow

export default function UserProfile() {
    const { data: session } = useSession()

    const userId = session?.user?.user?.id

    if (!session || !userId) return null

    return (
        <div>
            <h1>Welcome {session?.user?.user?.email}</h1>
        </div>
    )
}

UserProfile.auth = true
