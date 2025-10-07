"use client"

import { useState } from "react"
import { Button } from "components"
import { Calendar } from "components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover"

export function DatePicker() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-32 justify-between font-normal border-r-0 rounded-r-none"
        >
          วันที่สร้าง
          {/* <ChevronDownIcon /> */}
        </Button>
      </PopoverTrigger>

      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-56 justify-between font-normal rounded-l-none"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          {/* <ChevronDownIcon /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date}
          numberOfMonths={2}
          // selected={date}
          // onSelect={setDate}
          className="rounded-lg border shadow-sm"
        />
      </PopoverContent>
    </Popover>
  )
}