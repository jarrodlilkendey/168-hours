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

import { Project } from '@prisma/client'

interface ComponentProps {}

const createProjectViaAPI = async ({ name }) => {
    const { data } = await axiosInstance.post(`/api/${routes.projects}`, {
        name,
        userId: 1,
    })
    return data
}

export default function ProjectEntryForm({}: ComponentProps) {
    const formSchema = z.object({
        name: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createProjectViaAPI(values)
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
                        name={'name'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <input {...field} type='text' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit'>Create Project</Button>
                </form>
            </Form>
        </div>
    )
}
