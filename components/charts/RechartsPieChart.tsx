import React, { PureComponent } from 'react'
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

export interface PieChartDataPoint {
    name: string
    value: number
    fill: string
}

interface PieChartProps {
    data: PieChartDataPoint[]
}

export default function RechartsPieChart({ data }: PieChartProps) {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={500} height={300}>
                <Pie data={data} dataKey='value' cx='50%' cy='50%' label />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}
