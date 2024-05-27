import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { AuthError } from '@/components/auth/AuthError'
import { useSessionStatus } from '@/lib/users/useSessionStatus'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import { AxiosError } from 'axios'

interface FormField {
    display: string
    name: string
    default: string
}
export interface SignUpDetails {
    email: string
    password: string
}

export default function SignUpForm() {
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

    const handleSignUp = handleSubmit(async (data) => {
        axiosInstance({
            url: `/api/auth/register`,
            method: 'POST',
            data: JSON.stringify({ ...data }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                if (res.status == 200) {
                    signIn('credentials', {
                        ...data,
                        register: true,
                        redirect: false,
                    }).then(
                        // @ts-expect-error (docs for signIn return value conflict with TypeScript)
                        ({ error }) => {
                            if (error) setAuthError(error)
                        }
                    )
                }
            })
            .catch((error: AxiosError) => {
                setAuthError(error.message)
            })
    })

    return (
        <div>
            <div>
                <h2 className='text-lg font-bold'>Create your account</h2>
                <div>
                    <form data-testid='sign-up-form'>
                        {formFields.map((field) => (
                            <div key={field.name} className='flex mb-1'>
                                <label className='w-1/3' id={field.name}>
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
                                onClick={handleSignUp}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
                {authError ? <AuthError error={authError} /> : null}
            </div>
        </div>
    )
}
