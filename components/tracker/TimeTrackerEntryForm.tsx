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

interface ComponentProps {
    projects: Project[]
}

const createEntryViaAPI = async ({ label, projectId }) => {
    let projectIdNumber = null
    if (projectId != '') {
        projectIdNumber = parseInt(projectId)
    }

    const { data } = await axiosInstance.post(`/api/${routes.track}`, {
        label,
        userId: 1,
        start: new Date(),
        projectId: projectIdNumber,
    })
    return data
}

export default function TimeTrackerEntryForm({ projects }: ComponentProps) {
    const formSchema = z.object({
        label: z.string(),
        projectId: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: '',
            projectId: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('values', values)
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

                    {projects.length > 0 && (
                        <FormField
                            control={form.control}
                            name={'projectId'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <FormControl>
                                        <select {...field}>
                                            {[
                                                { id: '', name: '' },
                                                ...projects,
                                            ].map((project) => (
                                                <option
                                                    key={project.id}
                                                    value={project.id}
                                                >
                                                    {project.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <Button type='submit'>Start Recording </Button>
                </form>
            </Form>
        </div>
    )
}
