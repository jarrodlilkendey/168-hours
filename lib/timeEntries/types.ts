export type TimeEntryPutData = {
    label: string
    start: Date
    end: Date | null
    userId: number
    projectId: number | null
}

export type TimeEntryPatchData = {
    id: number
    label: string
    start: Date
    end: Date | null
    userId: number
    projectId: number | null
}
