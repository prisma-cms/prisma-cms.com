import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import withStyles from 'material-ui/styles/withStyles'

// import { FrontEditor } from "@prisma-cms/front";
import FrontEditor from '@prisma-cms/front-editor/lib/components/App'
import TemplatePage from '@prisma-cms/front-editor/lib/dev/Renderer/pages/Templates/Template'

import gql from 'graphql-tag'
import TopicsConnection from './Topics'
import TopicLink from './Topics/TopicLink'

import PrismaCmsComponent from '@prisma-cms/component'
import TemplateLink from './Templates/TemplateLink'
import Template from './Templates/Template'

export const styles = {
  root: {
    '&.inEditMode': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',

      '& $editorWrapper': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        // border: "1px solid red",
        overflow: 'auto',
      },
    },
  },
  editorWrapper: {},
}

export const locales = {
  ru: {
    values: {
      'Try another templates': 'Посмотрите другие шаблоны',
      'Edit this template': 'Редактировать этот шаблон',
    },
  },
}

class FrontEditorPage extends PrismaCmsComponent {
  // static contextType = Context;

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    CustomComponents: [TemplateLink, TopicsConnection, TopicLink, Template],
    locales,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...this.state,
      inEditMode: false,
    }
  }

  async saveTemplate(props) {
    const {
      query: { createTemplateProcessor },
    } = this.context

    const mutation = gql(createTemplateProcessor)

    return this.mutate({
      mutation,
      ...props,
    })
  }

  render() {
    const {
      // FrontEditor,
      Grid,
      uri,
    } = this.context

    const { inEditMode } = this.state

    const { classes, CustomComponents } = this.props

    const { templateId } = uri.query(true)

    // return "SDfsdf";

    const templatesList = (
      <FrontEditor
        inEditMode={false}
        debug={false}
        CustomComponents={CustomComponents}
        data={{
          object: {
            name: 'Connector',
            props: {
              orderBy: 'createdAt_DESC',
              skip: null,
              first: 12,
              last: null,
              query: 'templatesConnection',
              filtersname: 'templatesFilters',
              pagevariable: 'templatesPage',
            },
            components: [
              {
                name: 'Grid',
                props: {
                  container: true,
                  spacing: 8,
                  alignItems: 'center',
                },
                components: [
                  {
                    name: 'Grid',
                    props: {
                      item: true,
                      xs: 12,
                    },
                    components: [
                      {
                        name: 'Typography',
                        props: {
                          text: this.lexicon('Try another templates'),
                          variant: 'title',
                          color: 'primary',
                        },
                        components: [],
                      },
                    ],
                  },
                  {
                    name: 'Grid',
                    props: {
                      item: true,
                      xs: 12,
                    },
                    components: [
                      {
                        name: 'ListView',
                        components: [
                          {
                            name: 'Grid',
                            props: {
                              item: true,
                              // xs: true,
                            },
                            components: [
                              {
                                name: 'Grid',
                                props: {
                                  container: true,
                                  alignItems: 'center',
                                  spacing: 8,
                                },
                                components: [
                                  {
                                    name: 'Grid',
                                    props: {
                                      item: true,
                                      xs: 12,
                                      sm: true,
                                    },
                                    components: [
                                      {
                                        name: 'CreatedBy',
                                        props: {},
                                        components: [],
                                      },
                                    ],
                                  },
                                  {
                                    name: 'Grid',
                                    props: {
                                      item: true,
                                    },
                                    components: [
                                      {
                                        name: 'TemplateLink',
                                        props: {},
                                        components: [
                                          {
                                            name: 'Typography',
                                            props: {
                                              variant: 'subheading',
                                              color: 'primary',
                                              text: '',
                                            },
                                            components: [
                                              {
                                                name: 'NamedField',
                                                props: {
                                                  name: 'name',
                                                },
                                                components: [],
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
                        ],
                      },
                    ],
                  },
                  {
                    name: 'Grid',
                    props: {
                      item: true,
                      xs: 12,
                    },
                    components: [
                      {
                        name: 'Pagination',
                      },
                    ],
                  },
                ],
              },
            ],
            first: 12,
          },
        }}
      />
    )

    const toolbar = (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {templatesList}
        </Grid>

        <Grid item xs={12}>
          <Button
            size="small"
            // color="action"
            variant="raised"
            onClick={() => {
              this.setState({
                inEditMode: !inEditMode,
              })
            }}
          >
            {!inEditMode
              ? this.lexicon('Edit this template')
              : this.lexicon('Cancel')}
          </Button>
        </Grid>

        {/* <Grid
        item
        xs={12}
      >
        <Link
          to="/templates/create"
        >
          Создать свой шаблон
        </Link>
      </Grid> */}
      </Grid>
    )

    let editor

    if (templateId) {
      editor = (
        <TemplatePage
          inEditMode={inEditMode}
          where={{
            id: templateId,
          }}
          CustomComponents={CustomComponents}
        />
      )
    } else {
      const object = {
        name: 'Page',
        components: [
          {
            name: 'Section',
            components: [
              {
                name: 'Grid',
                container: true,
                components: [
                  {
                    name: 'Grid',
                    props: {
                      xs: 12,
                      item: true,
                    },
                    components: [
                      {
                        name: 'Typography',
                        props: {
                          variant: 'title',
                          text: 'Здесь все можно редактировать',
                          color: 'secondary',
                        },
                      },
                    ],
                  },
                  // {
                  //   "name": "Grid",
                  //   props: {
                  //     "xs": 12,
                  //     "item": true,
                  //   },
                  //   "components": [
                  //     {
                  //       "name": "Typography",
                  //       props: {
                  //         "text": "Пока поиграйтесь (с телефона неудобно), а вечером я напишу статью",
                  //         "variant": "subheading",
                  //         "color": "primary"
                  //       },
                  //     }
                  //   ]
                  // }
                ],
              },
            ],
          },
          {
            name: 'Section',
            components: [
              {
                name: 'TopicsConnection',
                props: {
                  first: 4,
                  query: 'resourcesConnection',
                  where: {
                    type: 'Topic',
                  },
                  orderBy: 'createdAt_DESC',
                  pagevariable: 'topicsPage',
                  filtersname: 'topicsFilters',
                },
                components: [
                  {
                    name: 'Typography',
                    props: {
                      text: 'Последние топики',
                      displayType: 'div',
                      display: 'block',
                      variant: 'subheading',
                      color: 'primary',
                    },
                  },
                  {
                    name: 'Filters',
                  },
                  {
                    name: 'ListView',
                    components: [
                      {
                        name: 'Grid',
                        props: {
                          item: true,
                          xs: 12,
                        },
                        components: [
                          {
                            name: 'Section',
                            components: [
                              {
                                name: 'Grid',
                                props: {
                                  container: true,
                                  alignItems: 'center',
                                  spacing: 8,
                                },
                                components: [
                                  {
                                    name: 'Grid',
                                    props: {
                                      item: true,
                                      xs: 12,
                                      md: 3,
                                    },
                                    components: [
                                      {
                                        name: 'Typography',
                                        props: {
                                          text: 'Название:',
                                          variant: 'caption',
                                        },
                                      },
                                    ],
                                  },
                                  {
                                    name: 'Grid',
                                    props: {
                                      xs: true,
                                      item: true,
                                    },
                                    components: [
                                      {
                                        name: 'TopicLink',
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                name: 'Grid',
                                props: {
                                  container: true,
                                  alignItems: 'center',
                                  spacing: 8,
                                },
                                components: [
                                  {
                                    name: 'Grid',
                                    props: {
                                      item: true,
                                      xs: 12,
                                      md: 3,
                                    },
                                    components: [
                                      {
                                        name: 'Typography',
                                        props: {
                                          text: 'Дата создания:',
                                          variant: 'caption',
                                        },
                                      },
                                    ],
                                  },
                                  {
                                    name: 'Grid',
                                    props: {
                                      xs: true,
                                      item: true,
                                    },
                                    components: [
                                      {
                                        name: 'NamedField',
                                        props: {
                                          name: 'createdAt',
                                        },
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                name: 'Grid',
                                props: {
                                  container: true,
                                  alignItems: 'center',
                                  spacing: 8,
                                },
                                components: [
                                  {
                                    name: 'Grid',
                                    props: {
                                      item: true,
                                      xs: 12,
                                      md: 3,
                                    },
                                    components: [
                                      {
                                        name: 'Typography',
                                        props: {
                                          text: 'Кем написан:',
                                          variant: 'caption',
                                        },
                                      },
                                    ],
                                  },
                                  {
                                    name: 'Grid',
                                    props: {
                                      xs: true,
                                      item: true,
                                    },
                                    components: [
                                      {
                                        name: 'CreatedBy',
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
                    name: 'Pagination',
                  },
                ],
              },
            ],
          },
          {
            name: 'Section',
            components: [
              {
                name: 'Typography',
                props: {
                  text: 'Все пользователи',
                  displayType: 'div',
                  display: 'block',
                  variant: 'subheading',
                  color: 'primary',
                },
              },
              {
                name: 'UsersGrid',
                props: {
                  first: 10,
                },
              },
            ],
          },
        ],
      }

      editor = (
        <FrontEditor
          inEditMode={inEditMode}
          CustomComponents={CustomComponents}
          debug={false}
          data={{
            object,
          }}
          mutate={(data) => this.saveTemplate(data)}
          _dirty={object}
          onSave={(result) => {
            const { response } = result.data || {}

            const { id } = (response && response.data) || {}

            if (id) {
              const {
                router: { history },
              } = this.context

              history.push(`/?templateId=${id}`)
            }
          }}
        />
      )

      // editor = <FrontEditor
      //   inEditMode={false}
      //   // inEditMode={true}
      //   // inEditMode={inEditMode}
      //   CustomComponents={CustomComponents}
      //   debug={false}
      //   data={{
      //     object: {
      //       "name": "Connector",
      //       // mutate: (props) => {

      //       // },
      //       props: {
      //         query: "templatesConnection",
      //         first: 1,
      //         orderBy: "updatedAt_DESC",
      //         where: {
      //           CreatedBy: {
      //             username: "Fi1osof",
      //           },
      //         },
      //         // mutate: (props) => {

      //         // },
      //       },
      //       "components": [
      //         {
      //           name: "ListView",
      //           components: [
      //             {
      //               name: "NamedField",
      //               props: {
      //                 name: "name",
      //               },
      //             }, {
      //               name: "CreatedBy",
      //             },
      //             {
      //               name: "Template",
      //               // mutate: (props) => {

      //               // },
      //             },
      //           ],
      //         }
      //       ]
      //     },
      //   }}
      //   mutate={(data) => this.saveTemplate(data)}
      // // _dirty={{
      // //   name: "Page",
      // //   components: [],
      // //   props: {},
      // // }}
      // />
    }

    return super.render(
      <div className={[classes.root, inEditMode ? 'inEditMode' : ''].join(' ')}>
        {toolbar}

        <div className={classes.editorWrapper}>{editor}</div>
      </div>
    )
  }
}

export default withStyles(styles)((props) => <FrontEditorPage {...props} />)
