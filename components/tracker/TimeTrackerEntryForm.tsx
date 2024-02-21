import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { axiosInstance } from '@/lib/axios/axiosInstance'
import { routes } from '@/lib/axios/routes'

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

const createEntryViaAPI = async ({ label }) => {
    const { data } = await axiosInstance.post(`/api/${routes.track}`, {
        label,
        userId: 1,
        start: new Date(),
    })
    return data
}

export default function TimeTrackerEntryForm() {
    const formSchema = z.object({
        label: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createEntryViaAPI(values)
    }

    return (
        <div className='w-full'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-2'
                    name='tracker-entry-form'
                >
                    <FormField
                        control={form.control}
                        name={'label'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <input {...field} type='text' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Start Recording </Button>
                </form>
            </Form>
        </div>
    )
}
