declare module '@prisma-cms/cooperation/lib/components/pages/Projects/View/Project' {
  import React from 'react'

  export const styles: any = {}

  export interface ProjectViewProps {}

  export interface ProjectViewState {}

  export class ProjectView<
    P extends ProjectViewProps = ProjectViewProps,
    S extends ProjectViewState = ProjectViewState
  > extends React.Component<P, S> {
    static propTypes = {}

    static defaultProps = {}

    updateObject(r: any): void

    getObjectWithMutations(): any

    renderResetButton(): JSX.Element | null

    isInEditMode(): boolean

    getButtons(): JSX.Element[] | null

    getTextField(arg0: any): JSX.Element | null

    onUpload(arg0: any): void

    renderTasks(): JSX.Element | null
  }
}
