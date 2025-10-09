import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

interface DropdownProps {
  label: string
  option: {
    label: string
    value: string
  }[]
}

export function Dropdown(props: DropdownProps) {
  const {
    label,
    option
  } = props
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{label}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {option.map((op, index) => (
          <DropdownMenuItem key={index}>
            {op.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}