export interface Schedule {
    id: number
    userId: number
    name: string
}

export type SchedulePutData = {
    name: string
    userId: number
}

export type TimeEntryPutData = {
    label: string
    userId: number
    start: Date
    end: Date | undefined
}

export type TimeEntryPatchData = {
    id: number
    label: string
    userId: number
    start: Date
    end: Date | undefined
}
