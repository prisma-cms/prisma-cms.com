import React from 'react'

import Connector from '@prisma-cms/front-editor/dist/components/App/components/public/Connector'
import Typography from 'material-ui/Typography'

class TopicsConnection extends Connector {
  static Name = 'TopicsConnection'

  renderPanelView() {
    const { classes, Grid, hoveredItem, dragTarget } = this.context

    const isActive = this.isActive()

    const isHovered =
      hoveredItem instanceof this.constructor && !isActive ? true : false

    const isDragOvered =
      dragTarget && dragTarget instanceof this.constructor ? true : false

    return (
      <Grid item xs={12}>
        <div
          className={[
            classes.panelItem,
            isHovered ? 'hovered' : '',
            isDragOvered ? 'dragOvered' : '',
          ].join(' ')}
          draggable
          onDragStart={(event) => this.onDragStart(event)}
          onDragEnd={(event) => this.onDragEnd(event)}
        >
          Топики
          <Typography variant="caption">
            Тот же коннектор, только топики
          </Typography>
        </div>
      </Grid>
    )
  }

  prepareDragItemProps() {
    const props = super.prepareDragItemProps()

    Object.assign(props, {
      query: 'resourcesConnection',
      where: {
        type: 'Topic',
      },
      first: 4,
      orderBy: 'createdAt_DESC',
      pagevariable: 'topicsPage',
      filtersname: 'topicsFilters',
    })

    return props
  }

  prepareDragItemComponents() {
    const components = super.prepareDragItemComponents()

    return components.concat([
      {
        type: 'Filters',
      },
      {
        type: 'ListView',
        components: [
          {
            type: 'Grid',
            item: true,
            xs: 12,
            components: [
              {
                type: 'Section',
                components: [
                  {
                    type: 'Grid',
                    container: true,
                    alignItems: 'center',
                    spacing: 8,
                    components: [
                      {
                        type: 'Grid',
                        item: true,
                        xs: 12,
                        md: 3,
                        components: [
                          {
                            type: 'Typography',
                            text: 'Название:',
                            variant: 'caption',
                          },
                        ],
                      },
                      {
                        type: 'Grid',
                        xs: true,
                        item: true,
                        components: [
                          {
                            type: 'TopicLink',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'Grid',
                    container: true,
                    alignItems: 'center',
                    spacing: 8,
                    components: [
                      {
                        type: 'Grid',
                        item: true,
                        xs: 12,
                        md: 3,
                        components: [
                          {
                            type: 'Typography',
                            text: 'Дата создания:',
                            variant: 'caption',
                          },
                        ],
                      },
                      {
                        type: 'Grid',
                        xs: true,
                        item: true,
                        components: [
                          {
                            type: 'NamedField',
                            name: 'createdAt',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'Grid',
                    container: true,
                    alignItems: 'center',
                    spacing: 8,
                    components: [
                      {
                        type: 'Grid',
                        item: true,
                        xs: 12,
                        md: 3,
                        components: [
                          {
                            type: 'Typography',
                            text: 'Кем написан:',
                            variant: 'caption',
                          },
                        ],
                      },
                      {
                        type: 'Grid',
                        xs: true,
                        item: true,
                        components: [
                          {
                            type: 'CreatedBy',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'Pagination',
      },
    ])
  }
}

export default TopicsConnection
