import {
  PrismaCmsComponentProps,
  PrismaCmsComponentState,
} from '@prisma-cms/component'
import { MeQuery } from 'src/modules/gql/generated'

export interface MainMenuProps extends PrismaCmsComponentProps {
  classes?: any

  user: MeQuery['user']
}

export interface MainMenuState extends PrismaCmsComponentState {}
