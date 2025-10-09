import {
  Label,
} from "components/ui"

import {
  Textarea as TextareaBase
} from '../ui/textarea'

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string
  description?: string
  isFlex?: boolean
  helperText?: string
  error?: boolean
}

export function Textarea(props: TextareaProps) {
  const {
    label,
    helperText,
    error,
    ...restProps
  } = props

  return (
    <div className="flex flex-col">
      {label && <Label className="mb-2">{label}</Label>}

      <TextareaBase
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