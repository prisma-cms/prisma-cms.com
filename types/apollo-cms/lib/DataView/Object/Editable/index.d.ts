
declare module 'apollo-cms/lib/DataView/Object/Editable' {

  import PrismaCmsComponent from "@prisma-cms/component";

  export interface EditableObjectProps {

    mutate?(arg0: any): Promise<void>;

  }

  export interface EditableObjectState {

  }

  export default class EditableObject<P extends EditableObjectProps = EditableObjectProps, S extends EditableObjectState = EditableObjectState> extends PrismaCmsComponent<P, S> {

    getObjectWithMutations(): any;

    save(): void;

    getObject(): any

    renderResetButton(): JSX.Element | null;

    getMutation(data: any): any;

    getButtons(): JSX.Element[] | null;

    isInEditMode(): boolean;

    getTextField(props: any): JSX.Element | null;

    updateObject(props: any): void;

    renderHeader(): JSX.Element | null
  }

}
