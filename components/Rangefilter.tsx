"use client"

import * as React from "react"
import { addDays, format, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface DatePickerWithRangePresetsProps {
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
}
export default function DatePickerWithRangePresets({
  dateRange,
  setDateRange,
}: DatePickerWithRangePresetsProps) {
  

  const handleRangeSelect = (value: string) => {
    const today = new Date()
    switch (value) {
      case "today":
        setDateRange({ from: today, to: today })
        break
      case "yesterday":
        const yesterday = subDays(today, 1)
        setDateRange({ from: yesterday, to: yesterday })
        break
      case "last7days":
        setDateRange({ from: subDays(today, 6), to: today })
        break
      case "last30days":
        setDateRange({ from: subDays(today, 29), to: today })
        break
      default:
        setDateRange(undefined)
    }
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (range?.from) {
      if (range.to) {
        if (range.from.toDateString() === range.to.toDateString()) {
          return format(range.from, "PPP")
        }
        return `${format(range.from, "PP")} - ${format(range.to, "PP")}`
      }
      return format(range.from, "PPP")
    }
    return "Pick a date range"
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal ",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange(dateRange)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select onValueChange={handleRangeSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="today" >Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last7days">Last 7 days</SelectItem>
            <SelectItem value="last30days">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}