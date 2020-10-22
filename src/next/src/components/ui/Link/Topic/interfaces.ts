import Maybe from "graphql/tsutils/Maybe";

export interface TopicLinkProps  {

  object?: {
    id: string;
    name: string;
    longtitle?: Maybe<string>;
    uri: string;
  }

}
