import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import EditorComponent from '@prisma-cms/front-editor/lib/components/App/components/'
// import EditableObject from '@prisma-cms/front-editor/lib/components/App/components/public/form/EditableObject';
import {
  EditableObjectContext,
  EditorContext,
} from '@prisma-cms/front-editor/lib/components/App/context'
import Resource from '..'
// import ResourceField from './Field';
import OldPageHeader from '../../OldPageHeader'
import OldPages from '../../pages/OldPages'
import { Button } from 'material-ui'

export class ResourceFieldsProxy extends EditorComponent {
  static propTypes = {
    objectContext: PropTypes.object.isRequired,
  }

  /**
   * Обновление данных объекта.
   * Так как компоненты рендерятся на основании передаваемых свойств,
   * надо обновить данные абсолютного родителя, а не просто текущего элемента
   */
  updateObject(data) {
    // console.log("ResourceFieldsProxy updateObject data", { ...data });

    // const object = this.getObjectWithMutations();

    const { objectContext } = this.props

    // console.log("ResourceFieldsProxy updateObject objectContext", { ...objectContext });

    const { updateObject } = objectContext

    return updateObject(data)
  }
}

export class ResourceFields extends EditorComponent {
  static Name = 'ResourceFields'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView() {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      <div className={classes.panelButton}>ResourceFields</div>
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return parent instanceof Resource && super.canBeParent(parent)
  }

  canBeChild(child) {
    // return child instanceof ResourceField && super.canBeChild(child);

    return (
      !(child instanceof OldPageHeader) &&
      !(child instanceof OldPages) &&
      super.canBeChild(child)
    )
  }

  renderMainView() {
    return (
      <EditableObjectContext.Consumer>
        {(context) => {
          Object.assign(this, {
            objectContext: context,
          })

          return super.renderMainView()
        }}
      </EditableObjectContext.Consumer>
    )
  }

  updateObject(data) {
    const { inEditMode } = this.getEditorContext()

    if (inEditMode) {
      return super.updateObject(data)
    } else {
      const { objectContext } = this

      const { updateObject, getObjectWithMutations } = objectContext || {}

      if (updateObject && getObjectWithMutations) {
        // console.log("updateObject updateObject", updateObject);

        const { components } = getObjectWithMutations() || {}

        if (components) {
          updateObject({
            components,
          })
        }
      }
    }

    return
  }

  addComponent(item) {
    const { inEditMode } = this.getEditorContext()

    if (inEditMode) {
      return super.addComponent(item)
    }

    const { name, component } = item

    if (!component) {
      item.component = name
    }

    this.addItem(item)
  }

  addItem(item) {
    const {
      objectContext: { updateObject, getObjectWithMutations },
    } = this

    const { components } = getObjectWithMutations() || {}

    updateObject({
      components: (components || []).concat([item]),
    })
  }

  // prepareNewItem(item) {

  //   item = super.prepareNewItem(item);

  //   if (!item) {
  //     return;
  //   }

  //   const {
  //     name,
  //     component,
  //   } = item;

  //   if (!component) {
  //     item.component = name;
  //   }

  //   /**
  //    * Пока я не пофиксил багу с обновлением данных дочерних компонентов
  //    * первого уровня, все добавляемые в корень компоненты оборачиваем в контейнер
  //    */
  //   let newItem = {
  //     name: "Section",
  //     component: "Section",
  //     props: {},
  //     components: [item],
  //   };

  //   return newItem;

  // }

  getActiveParent() {
    const { inEditMode } = this.getEditorContext()

    let parent

    if (inEditMode) {
      parent = super.getActiveParent()
    } else {
      parent = this
    }

    return parent
  }

  renderChildren() {
    const { Grid } = this.context

    const { Components, inEditMode } = this.getEditorContext()

    const { objectContext } = this

    const {
      // getEditor,
      inEditMode: objectInEditMode,
      // canEdit,
      getObjectWithMutations,
    } = objectContext

    const { components } = getObjectWithMutations() || {}

    let customComponents

    if (
      !inEditMode &&
      ((components && components.length) || objectInEditMode)
    ) {
      customComponents = (
        <EditorContext.Consumer>
          {(context) => {
            const { activeItem: _activeItem, setActiveItem } = context

            let activeItem = _activeItem

            if (objectInEditMode) {
              activeItem = activeItem || this

              context = {
                ...context,
                inEditMode: true,
                // activeItem,
                // activeItem: this,
              }
            }

            return (
              <EditorContext.Provider value={context}>
                {/* {components && components.map((n, index) => this.renderComponent(n, index))} */}

                {/* {this.renderComponent({
              name: "ResourceFieldsProxy",
              component: "ResourceFieldsProxy",
              props: {},
              components,
            })} */}

                <ResourceFieldsProxy
                  object={{
                    props: {},
                    components,
                  }}
                  parent={this}
                  mode="main"
                  objectContext={objectContext}
                />

                {!objectInEditMode ? null : activeItem === this ? (
                  <Grid container spacing={8}>
                    {Components.map((Component, index) => {
                      const name = Component.Name

                      return (
                        <Component
                          key={`${name}-${index}`}
                          mode="add_child"
                          className={'add_child'}
                          parent={this}
                        />
                      )
                    })}
                  </Grid>
                ) : (
                  <div
                    style={{
                      marginTop: 30,
                    }}
                  >
                    <Button
                      onClick={() => {
                        setActiveItem(this)
                      }}
                      size="small"
                      variant="raised"
                      color="primary"
                    >
                      Восстановить видимость
                    </Button>
                  </div>
                )}
              </EditorContext.Provider>
            )
          }}
        </EditorContext.Consumer>
      )
    }

    return (
      <Fragment>
        {super.renderChildren()}

        {customComponents}
      </Fragment>
    )
  }
}

export default ResourceFields
