import * as React from "react"

import {
  Select as SelectBase,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface SelectProps {
  color?: string
  option: Option[]
  value: string
  onChange: (value: string) => void
}

type Option = {
  label: string
  value: string
}

export function Select(props: SelectProps) {
  const {
    color,
    option,
    value,
    onChange
  } = props

  return (
    <SelectBase value={value} onValueChange={onChange}>
      <SelectTrigger className={`${"w-40 font-semibold"} ${color}`}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {option.map((op, index) => (
            <SelectItem
              key={index}
              value={op.value}
              // className={color}
            >
              {op.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectBase>
  )
}
