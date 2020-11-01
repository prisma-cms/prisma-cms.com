import { ObjectsListViewProps } from "src/components/view/List/interfaces";
import { BlogsConnectionQuery, Maybe } from "src/modules/gql/generated";

export interface BlogsViewProps extends ObjectsListViewProps{
  data: Maybe<BlogsConnectionQuery>;
}

