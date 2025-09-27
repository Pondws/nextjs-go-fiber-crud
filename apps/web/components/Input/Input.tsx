import {
  InputBase,
  Label,
} from "components/ui"

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
      {label && <Label className="mb-2">{label}</Label>}

      <InputBase
        {...restProps}
        className={error ? 'border-red-500' : ''}
      />

      {helperText && (
        <p className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  )
}