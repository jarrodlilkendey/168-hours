import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

interface FormResult {
    freeTimePerWeek: number
    freeTimePerDay: number
}

export default function FreeTimeCalculator() {
    const [formResult, setFormResult] = useState<FormResult | null>(null)

    const formItems = [
        {
            section: '',
            fields: [
                { label: 'Age', name: 'age', type: 'number', description: '' },
            ],
        },
        {
            section: 'Hours per week',
            fields: [
                {
                    label: 'Sleeping',
                    name: 'sleeping',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Working',
                    name: 'working',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Commuting',
                    name: 'commuting',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Exercise',
                    name: 'exercise',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Eating/cooking',
                    name: 'eating',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Chores',
                    name: 'chores',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Grooming/hygiene',
                    name: 'grooming',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Parenting duties',
                    name: 'parenting',
                    type: 'number',
                    description: '',
                },
                {
                    label: 'Other',
                    name: 'other',
                    type: 'number',
                    description: '',
                },
            ],
        },
    ]

    const formSchema = z.object({
        age: z.coerce.number().min(1),
        sleeping: z.coerce.number().min(0).max(168),
        working: z.coerce.number().min(0).max(168),
        commuting: z.coerce.number().min(0).max(168),
        exercise: z.coerce.number().min(0).max(168),
        eating: z.coerce.number().min(0).max(168),
        chores: z.coerce.number().min(0).max(168),
        grooming: z.coerce.number().min(0).max(168),
        parenting: z.coerce.number().min(0).max(168),
        other: z.coerce.number().min(0).max(168),
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: 20,
            sleeping: 56,
            working: 40,
            commuting: 5,
            exercise: 5,
            eating: 7,
            chores: 5,
            grooming: 3,
            parenting: 0,
            other: 0,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        const freeTimePerWeek =
            168 -
            values.sleeping -
            values.working -
            values.commuting -
            values.exercise -
            values.eating -
            values.chores -
            values.grooming -
            values.parenting -
            values.other

        const freeTimePerDay = freeTimePerWeek / 7

        setFormResult({ freeTimePerWeek, freeTimePerDay })
    }

    return (
        <div>
            <h1 className='text-3xl font-bold'>Free Time Calculator</h1>

            <div className='mb-1 w-full rounded p-2'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-2'
                        name=''
                    >
                        {formItems.map((section) => (
                            <div key={section.section}>
                                <h2 className='text-lg font-bold'>
                                    {section.section}
                                </h2>
                                {section.fields.map((fieldItem) => (
                                    <FormField
                                        control={form.control}
                                        name={
                                            fieldItem.name as
                                                | 'age'
                                                | 'sleeping'
                                                | 'working'
                                                | 'commuting'
                                                | 'exercise'
                                                | 'eating'
                                                | 'chores'
                                                | 'grooming'
                                                | 'parenting'
                                                | 'other'
                                        }
                                        key={fieldItem.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    {fieldItem.label}
                                                </FormLabel>
                                                <FormControl>
                                                    <input
                                                        {...field}
                                                        type={fieldItem.type}
                                                        className='w-full'
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {fieldItem.description}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        ))}
                        <Button type='submit'>Calculate Your Free Time</Button>
                    </form>
                </Form>
            </div>
            {formResult && (
                <div className='mb-1 w-full rounded p-2'>
                    <div>
                        <p>
                            Free time: {formResult.freeTimePerWeek} hours per
                            week or {formResult.freeTimePerDay} hours per day
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
