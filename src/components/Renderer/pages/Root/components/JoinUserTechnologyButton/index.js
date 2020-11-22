import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/dist/components/App/components/public/Connectors/Connector/ListView'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import gql from 'graphql-tag'

export class JoinUserTechnologyButton extends EditorComponent {
  static Name = 'JoinUserTechnologyButton'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || (
        <div className={classes.panelButton}>JoinUserTechnologyButton</div>
      )
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return super.canBeParent(parent)
  }

  canBeChild() {
    // return super.canBeChild(child);
    return false
  }

  renderChildren() {
    const { user: currentUser } = this.context

    const { inEditMode } = this.getEditorContext()

    const { loading } = this.state

    // const {
    //   ...other
    // } = this.getComponentProps(this);

    // return super.renderChildren();

    const { id: currentUserId } = currentUser || {}

    return (
      <ObjectContext.Consumer>
        {(objectContext) => {
          const { id: technologyId, UserTechnologies, __typename } =
            objectContext.object || {}

          if (!technologyId) {
            return null
          }

          if (__typename !== 'Technology') {
            if (inEditMode) {
              return (
                <Typography color="error">
                  __typename "Technology" required
                </Typography>
              )
            } else {
              return null
            }
          }

          if (!UserTechnologies) {
            if (inEditMode) {
              return (
                <Typography color="error">
                  UserTechnologies value required
                </Typography>
              )
            } else {
              return null
            }
          }

          /**
        Находим технологию текущего пользователя
         */
          const currentUserTechnology = currentUserId
            ? UserTechnologies.find(
                (n) => n.CreatedBy && n.CreatedBy.id === currentUserId
              )
            : null

          return currentUserTechnology ? null : (
            <Button
              size="small"
              color="primary"
              variant="raised"
              disabled={loading}
              onClick={() => {
                this.mutate({
                  mutation: gql`
                    mutation createUserTechnologyProcessor(
                      $data: UserTechnologyCreateInput!
                    ) {
                      response: createUserTechnologyProcessor(data: $data) {
                        success
                        message
                        errors {
                          key
                          message
                        }
                        data {
                          id
                        }
                      }
                    }
                  `,
                  variables: {
                    data: {
                      Technology: {
                        connect: {
                          id: technologyId,
                        },
                      },
                    },
                  },
                })
              }}
            >
              Использую
            </Button>
          )
        }}
      </ObjectContext.Consumer>
    )
  }
}

export default JoinUserTechnologyButton
