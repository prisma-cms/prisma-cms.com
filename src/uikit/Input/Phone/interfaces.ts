export interface PhoneFieldProps {
  onChange: (props: Record<string, any>) => void

  value: string

  label?: string

  name?: string

  fullWidth?: boolean
}
