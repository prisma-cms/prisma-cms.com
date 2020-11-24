import React from 'react'

import { EditableObjectContext } from '@prisma-cms/front-editor'

import Resource from '../'

import { TopicPage } from '../../../../../../pages/Topics/Topic'
import { updateTopicProcessor } from '../../../../../../pages/Topics/query'

export class TopicView extends TopicPage {
  static defaultProps = {
    ...TopicPage.defaultProps,
  }
}

export class Topic extends Resource {
  static Name = 'Topic'

  renderPanelView(content) {
    const { classes } = this.getEditorContext()

    return super.renderPanelView(
      content || <div className={classes.panelButton}>Topic</div>
    )
  }

  View = (props) => {
    const { children } = props

    return children || null
  }

  renderChildren() {
    return (
      <EditableObjectContext.Consumer>
        {(context) => {
          const { getObjectWithMutations } = context

          /**
        Если это уже существующий топик и у него есть контент, но нет компонентов,
        то выводим классическую страницу.
         */

          const object = getObjectWithMutations()

          const { content, components } = object || {}

          let View

          if (!content || components) {
            View = this.View
          } else {
            /**
            Для старых топиков
           */
            return (
              <TopicView
                data={{
                  object,
                }}
                mutation={updateTopicProcessor}
              ></TopicView>
            )
          }

          return (
            <TopicView
              data={{
                object,
              }}
              View={View}
            >
              {super.renderChildren()}
            </TopicView>
          )
        }}
      </EditableObjectContext.Consumer>
    )
  }
}

export default Topic
