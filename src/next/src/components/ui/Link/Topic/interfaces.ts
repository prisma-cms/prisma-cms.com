import Maybe from "graphql/tsutils/Maybe";

export interface TopicLinkProps  {

  object?: {
    __typename?: 'Resource'
    id: string;
    name: string;
    longtitle?: Maybe<string>;
    uri: string;
  }

}
