export const AuthError = ({ error }: { error: string | Array<string> }) => {
    const errors = typeof error === 'string' ? [error] : error

    return (
        <div>
            {errors.map((errorText) => (
                <p key={errorText}>{errorText}</p>
            ))}
        </div>
    )
}
