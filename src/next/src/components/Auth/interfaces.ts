import {
  PrismaCmsComponentProps,
  PrismaCmsComponentState,
} from '@prisma-cms/component'

export type AuthProps = PrismaCmsComponentProps & {
  open: boolean

  useMetamask: boolean

  showRegForm: boolean

  loginCanceled: () => void

  loginComplete: (arg0: any) => void

  step?: string
}

export interface AuthState extends PrismaCmsComponentState {
  step: string
}
