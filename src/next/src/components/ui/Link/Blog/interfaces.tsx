import Maybe from "graphql/tsutils/Maybe";
import { UiLinkProps } from "../interfaces";

export interface BlogLinkProps {

  object: {
    id: string;
    uri: string;
    name: string;
    longtitle: Maybe<string>;
  }

  variant?: UiLinkProps["variant"];

  classes? : {
    root: string;
    text: string;
  }
  
}
