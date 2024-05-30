/* eslint-disable no-param-reassign */
import { ProjectPutData, ProjectPatchData } from '@/lib/projects/types'

import prisma from '@/lib/prisma'
import { Project } from '@prisma/client'
import { trace } from '@opentelemetry/api'

export const getMyProjects = async (userId: number) => {
    return await trace
        .getTracer('168-hours-app')
        .startActiveSpan('getMyProjects', async (span) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                })

                if (!user) {
                    throw new Error('User not found')
                }

                const projects = await prisma.project.findMany({
                    orderBy: { id: 'desc' },
                    where: { userId: user.id },
                })

                return projects
            } finally {
                span.end()
            }
        })
}

export const getProjectById = (id: number) =>
    prisma.project.findUniqueOrThrow({ where: { id } })

export const createProject = async (project: ProjectPutData) => {
    const newProject: Project = await prisma.project.create({
        data: project,
    })

    return prisma.project.findUnique({ where: { id: newProject.id } })
}

export const updateTimeEntry = async (project: ProjectPatchData) => {
    const updatedProject: Project = await prisma.project.update({
        where: { id: project.id },
        data: project,
    })

    return prisma.project.findUnique({ where: { id: updatedProject.id } })
}

export const deleteProject = async (id: number) => {
    return prisma.project.delete({ where: { id } })
}
