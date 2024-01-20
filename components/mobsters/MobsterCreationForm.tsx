'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export default function MobsterCreationForm() {
    // player name
    // perk / class
    // assign skill points

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Name must be at least 2 characters.',
        }),
    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log('onSubmit', values)
        fetch(
            `/api/mobsters?secret=E93hz9o0dAsPOvA3y0KIHIpQwtC4vaadNEsy96xsiF0Ut/i1a2ssF1APpDnA89w9/MARctp16wXDkKzFIvyBsw==`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ name: values.name }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                form.reset()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <label id='name-label'>Name</label>
                <input
                    aria-labelledby='name-label'
                    {...form.register('name')}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
