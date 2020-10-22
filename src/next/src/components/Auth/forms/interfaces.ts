import {
  PrismaCmsComponentProps,
  PrismaCmsComponentState,
} from '@prisma-cms/component'
import { DialogProps } from 'material-ui/Dialog'

import { AuthUserFragment } from 'src/modules/gql/generated'

export type AuthFormResponse = {
  token: string
  user: AuthUserFragment
}

export interface AuthFormProps extends PrismaCmsComponentProps {
  loginCanceled: () => void

  loginComplete: (arg0: AuthFormResponse) => void

  switchForm: (arg0: string) => void

  fullWidth?: boolean

  maxWidth?: DialogProps['maxWidth']

  dialogProps?: DialogProps

  open: boolean

  useMetamask: boolean
}

export interface AuthFormState extends PrismaCmsComponentState {
  step: string
}
