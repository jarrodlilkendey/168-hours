export interface Schedule {
    id: number
    userId: number
    name: string
}

export type SchedulePutData = {
    name: string
    userId: number
}
