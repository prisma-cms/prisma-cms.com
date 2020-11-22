/* eslint-disable react/jsx-no-bind */
import React from 'react'

import EditorComponent from '@prisma-cms/front-editor/dist/components/App/components/'
import { ObjectContext } from '@prisma-cms/front-editor/dist/components/App/components/public/Connectors/Connector/ListView'
import Button from 'material-ui/Button'
import gql from 'graphql-tag'

export class AcceptTechnologyLesson extends EditorComponent {
  static Name = 'AcceptTechnologyLesson'

  static defaultProps = {
    ...EditorComponent.defaultProps,
  }

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || (
        <div className={classes.panelButton}>AcceptTechnologyLesson</div>
      )
    )
  }

  getRootElement() {
    return super.getRootElement()
  }

  canBeParent(parent) {
    return super.canBeParent(parent)
  }

  canBeChild(child) {
    return super.canBeChild(child)
  }

  renderChildren() {
    const { user: currentUser } = this.context

    // const {
    // } = this.getEditorContext();

    // const {
    //   ...other
    // } = this.getComponentProps(this);

    const { loading } = this.state

    const query = `
      mutation create (
        $data: TechnologyLessonUserCreateInput!
      ){
        response: createTechnologyLessonUserProcessor (
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...lessonUser
            CreatedBy {
              ...user
            }
          }
        }
      }
      
      fragment lessonUser on TechnologyLessonUser @prismaCmsFragmentAllFields {
        id
      }
      
      fragment user on User @prismaCmsFragmentAllFields {
        id
      }
    `

    // const children = super.renderChildren();

    const { id: currentUserId } = currentUser || {}

    return (
      <ObjectContext.Consumer key="AcceptTechnologyLesson">
        {(objectContext) => {
          const { object } = objectContext

          const { id: lessonId, Users, CreatedBy, __typename } = object || {}

          if (!lessonId) {
            return null
          }

          let output = null
          let userLesson = null

          /**
          Поиск в списке пользователей урока
         */
          if (__typename === 'TechnologyLesson') {
            userLesson =
              currentUserId && Users
                ? Users.find(
                    (n) => n && n.CreatedBy && n.CreatedBy.id === currentUserId
                  )
                : null
          } else if (__typename === 'TechnologyLessonUser') {
            /**
        В конкретной связке Урок-Пользователь
         */
            userLesson =
              currentUserId && CreatedBy && CreatedBy.id === currentUserId
                ? object
                : null

            /**
            Если эта связка не принадлежит текущему пользователю, то возвращаем пусто
           */
            if (!userLesson) {
              return null
            }
          } else {
            return null
          }

          // console.log("userLesson", userLesson);

          // return children;

          if (!userLesson) {
            output = (
              <Button
                variant="raised"
                size="small"
                disabled={loading ? true : false}
                onClick={() => {
                  this.mutate({
                    mutation: gql(query),
                    variables: {
                      data: {
                        Lesson: {
                          connect: {
                            id: lessonId,
                          },
                        },
                      },
                    },
                  })
                }}
              >
                Принять урок
              </Button>
            )
          } else {
            const { id: userLessonId, status } = userLesson

            const mutation = gql(`
            mutation updateTechnologyLessonUserProcessor (
              $data: TechnologyLessonUserUpdateInput!
              $where: TechnologyLessonUserWhereUniqueInput!
            ){
              response: updateTechnologyLessonUserProcessor (
                data: $data
                where: $where
              ){
                success
                message
                errors{
                  key
                  message
                }
                data{
                  id
                  status
                }
              }
            }
            `)

            switch (status) {
              case 'Accepted':
                output = (
                  <Button
                    variant="raised"
                    size="small"
                    color="primary"
                    disabled={loading ? true : false}
                    onClick={() => {
                      this.mutate({
                        mutation,
                        variables: {
                          data: {
                            status: 'Completed',
                          },
                          where: {
                            id: userLessonId,
                          },
                        },
                      })
                    }}
                  >
                    Завершить
                  </Button>
                )
                break

              case 'Completed':
                break

              default:
            }
          }

          return output
        }}
      </ObjectContext.Consumer>
    )
  }
}

export default AcceptTechnologyLesson
