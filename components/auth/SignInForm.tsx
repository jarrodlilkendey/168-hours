import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { AuthError } from '@/components/auth/AuthError'
import { useSessionStatus } from '@/lib/users/useSessionStatus'

interface FormField {
    display: string
    name: string
    default: string
}
export interface SignInDetails {
    email: string
    password: string
}

export default function SignInForm() {
    const router = useRouter()
    const [authError, setAuthError] = useState<string | null>(null)
    const { callbackUrl } = router.query
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { isLoading, isLoggedIn } = useSessionStatus()
    if (isLoggedIn) {
        router.push(
            callbackUrl && typeof callbackUrl === 'string'
                ? callbackUrl
                : '/user'
        )
    }

    const formFields: Array<FormField> = [
        { name: 'email', display: 'Email address', default: 'test@test.test' },
        { name: 'password', display: 'Password', default: 'test' },
    ]

    const handleSignIn = handleSubmit((data) =>
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(
            // @ts-expect-error (docs for signIn return value conflict with TypeScript)
            ({ error }) => {
                if (error) setAuthError(error)
            }
        )
    )

    return (
        <div>
            <div>
                <h2 className='text-lg font-bold'>Sign in to your account</h2>
                <div>
                    <form data-testid='sign-in-form'>
                        {formFields.map((field) => (
                            <div key={field.name} className='flex mb-1'>
                                <label id={field.name} className='w-1/3'>
                                    {field.display}
                                </label>
                                <input
                                    aria-labelledby={field.name}
                                    {...register(field.name)}
                                    defaultValue={field.default}
                                    className='w-2/3'
                                />
                            </div>
                        ))}
                        <div>
                            <button
                                disabled={isLoading}
                                onClick={handleSignIn}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                {authError ? <AuthError error='Sign in failed' /> : null}
            </div>
        </div>
    )
}
