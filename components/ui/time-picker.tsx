'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { ClockIcon, ChevronUpIcon, ChevronDownIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimePickerProps {
    value: string
    onChange: (value: string) => void
    className?: string
    disabled?: boolean
}

export function TimePicker({
    value,
    onChange,
    className,
    disabled
}: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [hours, minutes] = value ? value.split(':').map(Number) : [0, 0]
    const [period, setPeriod] = useState(hours >= 12 ? 'PM' : 'AM')
    const [animateHour, setAnimateHour] = useState('')
    const [animateMinute, setAnimateMinute] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const displayHours = hours % 12 || 12 // Convert to 12-hour format

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const updateTime = (newHours: number, newMinutes: number) => {
        const hours24 = period === 'PM'
            ? newHours === 12 ? 12 : newHours + 12
            : newHours === 12 ? 0 : newHours

        onChange(`${String(hours24).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`)
    }

    const handleHourChange = (increment: number) => {
        setAnimateHour(increment > 0 ? 'animate-slide-up' : 'animate-slide-down')
        setTimeout(() => setAnimateHour(''), 200)

        let newHours = displayHours + increment
        if (newHours > 12) newHours = 1
        if (newHours < 1) newHours = 12
        updateTime(newHours, minutes)
    }

    const handleMinuteChange = (increment: number) => {
        setAnimateMinute(increment > 0 ? 'animate-slide-up' : 'animate-slide-down')
        setTimeout(() => setAnimateMinute(''), 200)

        let newMinutes = minutes + increment
        if (newMinutes > 59) newMinutes = 0
        if (newMinutes < 0) newMinutes = 59
        updateTime(displayHours, newMinutes)
    }

    const togglePeriod = () => {
        setPeriod(period === 'AM' ? 'PM' : 'AM')
        updateTime(displayHours, minutes)
    }

    const handlePresetTime = (presetTime: string) => {
        onChange(presetTime)
        setIsOpen(false)
    }

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            {/* Trigger Button */}
            <Button
                variant="outline"
                className={cn(
                    "w-full justify-between px-3 transition-all duration-200",
                    disabled && "opacity-50 cursor-not-allowed",
                    isOpen && "ring-2 ring-primary"
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" />
                    <span>
                        {value ? `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}` : 'Select time'}
                    </span>
                </div>
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </Button>

            {/* Dropdown Content */}
            {isOpen && (
                <div
                    className={`
            absolute z-50 mt-1 w-full bg-white shadow-lg border rounded-md p-4
            transition-all duration-200
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
                >
                    {/* Time Selector */}
                    <div className="flex justify-center items-center gap-4 mb-4">
                        {/* Hours */}
                        <div className="flex flex-col items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleHourChange(1)}
                                className="h-8 w-8 hover:bg-gray-100 active:scale-95 transition-transform"
                            >
                                <ChevronUpIcon className="h-4 w-4" />
                            </Button>
                            <div className={`text-2xl font-medium w-12 text-center ${animateHour}`}>
                                {String(displayHours).padStart(2, '0')}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleHourChange(-1)}
                                className="h-8 w-8 hover:bg-gray-100 active:scale-95 transition-transform"
                            >
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="text-2xl font-medium">:</div>

                        {/* Minutes */}
                        <div className="flex flex-col items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMinuteChange(1)}
                                className="h-8 w-8 hover:bg-gray-100 active:scale-95 transition-transform"
                            >
                                <ChevronUpIcon className="h-4 w-4" />
                            </Button>
                            <div className={`text-2xl font-medium w-12 text-center ${animateMinute}`}>
                                {String(minutes).padStart(2, '0')}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMinuteChange(-1)}
                                className="h-8 w-8 hover:bg-gray-100 active:scale-95 transition-transform"
                            >
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* AM/PM */}
                        <Button
                            variant="outline"
                            onClick={togglePeriod}
                            className="h-[72px] w-12 flex flex-col justify-center items-center hover:bg-gray-50 active:scale-[0.98] transition-transform"
                        >
                            {period}
                        </Button>
                    </div>

                    {/* Quick Presets */}
                    <div className="grid grid-cols-3 gap-2">
                        {['Now', 'Morning', 'Noon', 'Afternoon', 'Evening', 'Night'].map((preset) => (
                            <Button
                                key={preset}
                                variant="outline"
                                size="sm"
                                className="text-xs h-8 hover:bg-gray-50 active:scale-[0.98] transition-transform"
                                onClick={() => {
                                    const times: Record<string, string> = {
                                        'Now': formatTime(new Date()),
                                        'Morning': '08:00',
                                        'Noon': '12:00',
                                        'Afternoon': '15:00',
                                        'Evening': '18:00',
                                        'Night': '22:00'
                                    }
                                    handlePresetTime(times[preset])
                                }}
                            >
                                {preset}
                            </Button>
                        ))}
                    </div>

                    {/* Done Button */}
                    <Button
                        variant="default"
                        size="sm"
                        className="w-full mt-3 hover:bg-primary/90 active:scale-[0.98] transition-transform"
                        onClick={() => setIsOpen(false)}
                    >
                        <CheckIcon className="mr-2 h-4 w-4" /> Done
                    </Button>
                </div>
            )}
        </div>
    )
}

function formatTime(date: Date): string {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}