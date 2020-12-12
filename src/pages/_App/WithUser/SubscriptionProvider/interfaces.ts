import { MeQuery } from 'src/modules/gql/generated'
import { PrismaCmsContext } from '@prisma-cms/context'

export interface SubscriptionProviderProps {
  client: PrismaCmsContext['client']

  user: MeQuery['user']
}

export interface SubscriptionProviderState {
  subscriptions: ZenObservable.Subscription[]
}
