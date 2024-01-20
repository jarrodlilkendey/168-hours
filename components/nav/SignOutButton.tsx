import { signOut } from 'next-auth/react'

import { useSessionStatus } from '@/lib/users/useSessionStatus'

export const SignOutButton: React.FC = () => {
    const { isLoading, isLoggedIn } = useSessionStatus()
    if (!isLoggedIn) return null

    const handleClick = () => signOut({ redirect: false })

    return (
        <button disabled={isLoading} onClick={handleClick}>
            Sign Out
        </button>
    )
}
