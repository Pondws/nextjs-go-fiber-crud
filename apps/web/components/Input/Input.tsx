import {
  InputBase,
  Label,
} from "components"

interface InputProps extends React.ComponentProps<typeof InputBase> {
  label?: string
  description?: string
  isFlex?: boolean
  helperText?: string
  error?: boolean
}

export function Input(props: InputProps) {
  const {
    label,
    helperText,
    error,
    ...restProps
  } = props

  return (
    <div className="flex flex-col">
      {label && <Label>{label}</Label>}

      <InputBase
        {...restProps}
      />

      {helperText && (
        <p className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  )
}