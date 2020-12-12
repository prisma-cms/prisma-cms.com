import { ApolloQueryResult } from '@apollo/client'
import { TopicQuery } from 'src/modules/gql/generated'
import { PageProps } from '../../_App/interfaces'

export interface TopicPageProps extends PageProps {
  queryResult: ApolloQueryResult<TopicQuery>
}
