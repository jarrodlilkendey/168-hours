import { useSession } from 'next-auth/react'

export default function UserPage() {
    const { data: session } = useSession()

    const userId = session?.user?.user?.id

    if (!session || !userId) return null

    return (
        <div>
            <h1>Welcome {session?.user?.user?.email}</h1>
        </div>
    )
}

UserPage.auth = true
