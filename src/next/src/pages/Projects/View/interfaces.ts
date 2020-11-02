import { ObjectsListViewProps } from "src/components/view/List/interfaces";
import { ProjectsConnectionQuery, ProjectsConnectionQueryVariables } from "src/modules/gql/generated";

export interface ProjectsViewProps extends ObjectsListViewProps{
  data: ProjectsConnectionQuery | null | undefined;

  variables?: ProjectsConnectionQueryVariables;
}

