import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

export interface StackedBarChartDataPoint {
    name: string
    values: number[]
}

export interface StackedBarChartSegment {
    dataKey: string
    stackId: string
    color: string
    name: string
}

interface StackedBarChartProps {
    data: StackedBarChartDataPoint[]
    segments: StackedBarChartSegment[]
}

export default function RechartsStackedBarChart({
    data,
    segments,
}: StackedBarChartProps) {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                {segments.map((segment, index) => {
                    return (
                        <Bar
                            key={index}
                            name={segment.name}
                            dataKey={segment.dataKey}
                            stackId={segment.stackId}
                            fill={segment.color}
                        />
                    )
                })}
            </BarChart>
        </ResponsiveContainer>
    )
}
