import SignInForm from '@/components/auth/SignInForm'
import SignUpForm from '@/components/auth/SignUpForm'

export default function LoginSignUpPage() {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}
