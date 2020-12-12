import React from 'react'

import EditableView from 'apollo-cms/dist/DataView/Object/Editable'

// import withStyles from 'material-ui/styles/withStyles'

import moment from 'moment'

import UserLink from 'src/uikit/Link/User'

import Editor from 'src/uikit/Editor'
import Typography from 'material-ui/Typography'

import Grid from 'src/uikit/Grid'
import { TopicViewProps } from './interfaces'
import { TopicViewStyled } from './styles'
import { PrismaCmsEditorRawContent } from '@prisma-cms/editor'

import CommentsView from './Comments'
import Blog from './Blog'

import RootPage from 'src/components/Root'
import { EditorComponentProps } from '@prisma-cms/front-editor/dist/EditorComponent'

// const styles = {
//   root: {
//     marginTop: 15,
//     marginBottom: 30,

//     '& pre': {
//       whiteSpace: 'pre-line' as 'pre-line',
//     },
//   },
//   bullet: {},
//   header: {
//     // '& a': {
//     //   textDecoration: 'none',
//     // },
//     marginBottom: 30,
//   },
// }

class TopicView extends EditableView<TopicViewProps> {
  static defaultProps = {
    ...EditableView.defaultProps,
  }

  canEdit() {
    const { user: currentUser } = this.context

    const { id: currentUserId, sudo } = currentUser || {}

    const { id, CreatedBy } = this.getObjectWithMutations() || {}

    const { id: createdById } = CreatedBy || {}

    return (
      !id || (createdById && createdById === currentUserId) || sudo === true
    )
  }

  getCacheKey() {
    const { id } = this.getObject() || {}

    return `topic_${id || 'new_topic'}`
  }

  renderHeader() {
    // const { classes } = this.props

    const object = this.getObjectWithMutations()

    const { CreatedBy, createdAt } = object || {}

    const inEditMode = this.inEditMode()

    return (
      <div className={'header'}>
        <Grid container spacing={16}>
          {CreatedBy ? (
            <Grid item>
              <UserLink
                user={CreatedBy}
                showName={false}
                avatarProps={{
                  size: 'medium',
                }}
              />
            </Grid>
          ) : null}

          <Grid item>
            {CreatedBy ? (
              <UserLink user={CreatedBy} withAvatar={false} />
            ) : null}

            {createdAt ? (
              <Typography variant="caption" color="textSecondary">
                {moment(createdAt).format('lll')}
              </Typography>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={16} alignItems="center">
              <Grid item xs>
                {inEditMode ? (
                  this.getTextField({
                    name: 'name',
                    label: 'Название топика',
                    helperText: 'Укажите название топика',
                  })
                ) : (
                  <Typography variant="display1" component="h1">
                    {this.getTitle()}
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Blog
                  Topic={object}
                  updateObject={this.updateObject}
                  inEditMode={inEditMode}
                />
              </Grid>

              <Grid item>{this.getButtons()}</Grid>
            </Grid>

            {/* {inEditMode && !topicId ? this.getTextField({
            name: "topic_tags",
            label: "Теги",
            helperText: "Перечислите теги через запятую",
            value: topic_tags && topic_tags.join(",") || "",
            onChange: event => {

              const {
                name,
                value,
              } = event.target;

              this.updateObject({
                [name]: value && value.split(",").map(n => n && n.trim() || "") || [],
              });

            }
          }) : null} */}
          </Grid>
        </Grid>
      </div>
    )
  }

  onEditorChange = (rawContent: PrismaCmsEditorRawContent) => {
    this.updateObject({
      content: rawContent,
    })
  }

  onChangeState = (data: EditorComponentProps['_dirty']) => {
    // console.log("onChangeState components", data);

    this.updateObject(data)
    return data
  }

  renderDefaultView() {
    const object = this.getObjectWithMutations()

    if (!object) {
      return null
    }
    // const { classes } = this.props

    // console.log("Topic object", object);

    const { content, components } = object

    const inEditMode = this.inEditMode()

    // console.log("Topic components", components);

    // const allow_edit = this.canEdit()

    let output = null

    if (content) {
      output = (
        <Editor
          editorKey="topic"
          className="topic-editor"
          value={content}
          // inEditMode={inEditMode || false}
          readOnly={inEditMode ? false : true}
          // fullView={true}
          // allow_edit={allow_edit}
          onChange={this.onEditorChange}
        />
      )
    } else {
      output = (
        <RootPage
          // object={undefined}
          inEditMode={inEditMode}
          itemsOnly
          onChangeState={this.onChangeState}
          object={{
            name: 'Section',
            component: 'Section',
            components:
              components && Array.isArray(components) ? components : [],
            props: {},
          }}
        />
      )
    }

    return (
      <div className={'root'}>
        {output}

        <CommentsView topic={object} />
      </div>
    )
  }

  renderEditableView() {
    return this.renderDefaultView()
  }

  render() {
    return <TopicViewStyled>{super.render()}</TopicViewStyled>
  }
}

// export default withStyles(styles)((props: TopicView) => <TopicView {...props} />)
export default TopicView
