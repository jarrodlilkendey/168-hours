'use client'

import * as React from 'react'
import {
    format,
    subDays,
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    subMonths,
    subYears,
    startOfYear,
    endOfYear,
} from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerWithRangeComponentProps {
    className?: React.HTMLAttributes<HTMLDivElement>
    date?: DateRange
    setDate: (date: DateRange) => void
}

const timeOptions = [
    {
        label: 'Today',
        value: 'today',
        from: startOfDay(new Date()),
        to: endOfDay(new Date()),
    },
    {
        label: 'Yesterday',
        value: 'yesterday',
        from: startOfDay(subDays(new Date(), 1)),
        to: endOfDay(subDays(new Date(), 1)),
    },
    {
        label: 'This week',
        value: 'thisWeek',
        from: startOfDay(startOfWeek(new Date())),
        to: endOfDay(endOfWeek(new Date())),
    },
    {
        label: 'Last week',
        value: 'lastWeek',
        from: startOfDay(subDays(startOfWeek(new Date()), 7)),
        to: endOfDay(subDays(endOfWeek(new Date()), 7)),
    },
    {
        label: 'Last 14 days',
        value: 'last14d',
        from: startOfDay(subDays(new Date(), 13)),
        to: endOfDay(new Date()),
    },
    {
        label: 'This month',
        value: 'thisMonth',
        from: startOfDay(startOfMonth(new Date())),
        to: endOfDay(endOfMonth(new Date())),
    },
    {
        label: 'Last month',
        value: 'lastMonth',
        from: startOfDay(subMonths(startOfMonth(new Date()), 1)),
        to: endOfDay(subMonths(endOfMonth(new Date()), 1)),
    },
    {
        label: 'Last 30 days',
        value: 'last30d',
        from: startOfDay(subDays(new Date(), 29)),
        to: endOfDay(new Date()),
    },
    {
        label: 'Last 60 days',
        value: 'last60d',
        from: startOfDay(subDays(new Date(), 59)),
        to: endOfDay(new Date()),
    },
    {
        label: 'Last 90 days',
        value: 'last90d',
        from: startOfDay(subDays(new Date(), 89)),
        to: endOfDay(new Date()),
    },
    {
        label: 'Last 180 days',
        value: 'last180d',
        from: startOfDay(subDays(new Date(), 179)),
        to: endOfDay(new Date()),
    },
    {
        label: 'Last 365 days',
        value: 'last365d',
        from: startOfDay(subDays(new Date(), 364)),
        to: endOfDay(new Date()),
    },
    {
        label: 'This year',
        value: 'thisYear',
        from: startOfDay(startOfYear(new Date())),
        to: endOfDay(new Date()),
    },
    {
        label: 'Last year',
        value: 'lastYear',
        from: startOfDay(startOfYear(subYears(new Date(), 1))),
        to: endOfDay(endOfYear(subYears(new Date(), 1))),
    },
]

export function DatePickerWithRange({
    className,
    date,
    setDate,
}: DatePickerWithRangeComponentProps) {
    return (
        <div className='grid grid-cols-2'>
            <div>
                {timeOptions.map((option) => (
                    <Button
                        key={option.value}
                        variant='link'
                        onClick={() =>
                            setDate({ from: option.from, to: option.to })
                        }
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
            <div className={cn('grid gap-2', className)}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id='date'
                            variant={'outline'}
                            className={cn(
                                'w-[300px] justify-start text-left font-normal',
                                !date && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, 'LLL dd, y')} -{' '}
                                        {format(date.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(date.from, 'LLL dd, y')
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                            initialFocus
                            mode='range'
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
