import { ObjectsListViewProps } from "src/components/view/List/interfaces";
import { UsersConnectionQuery, Maybe } from "src/modules/gql/generated";

export interface UsersViewProps extends ObjectsListViewProps{
  data: Maybe<UsersConnectionQuery>;
}

