import React from 'react'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable'

import withStyles from 'material-ui/styles/withStyles'

import moment from 'moment'

import { UserLink } from '@modxclub/ui'

import Editor from '@modxclub/react-editor'
import Typography from 'material-ui/Typography'

import Grid from '@prisma-cms/front/lib/modules/ui/Grid'

import CommentsView from './Comments'
import Blog from './Blog'

const styles = {
  root: {
    marginTop: 15,
    marginBottom: 30,

    '& pre': {
      whiteSpace: 'pre-line',
    },
  },
  bullet: {},
  header: {
    // '& a': {
    //   textDecoration: 'none',
    // },
    marginBottom: 30,
  },
}

class TopicView extends EditableView {
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

    return `topic_${id || 'new'}`
  }

  renderHeader() {
    const { classes } = this.props

    const object = this.getObjectWithMutations()

    const { CreatedBy, createdAt } = object || {}

    const inEditMode = this.isInEditMode()

    return (
      <div className={classes.header}>
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
                  updateObject={(data) => this.updateObject(data)}
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

  renderDefaultView() {
    const object = this.getObjectWithMutations()

    if (!object) {
      return null
    }

    const { classes } = this.props

    const { content } = object

    const inEditMode = this.isInEditMode()

    const allow_edit = this.canEdit()

    return (
      <div className={classes.root}>
        {/* {inEditMode !== true ?
        <div
          className={classes.header}
          avatar={<UserLink
            user={CreatedBy}
          />}
          title={<TopicLink
            object={object}
            className="Card--title"
          />}
          subheader={<div>{(date ? moment(date).format('YYYY.MM.DD HH:mm') + " " : null)}
            {Blog ? <BlogLink
              object={Blog}
            /> : null}
          </div>}
        >


        </div>
        :
        <div>
          <TextField
          // name="name"
          // value={name}
          // label="Название топика"
          // error={errors.name && errors.name != ""}
          // onFocus={() => { this.clearError() }}
          // onChange={(e, value) => { this.onChangename(e, value) }}
          />
        </div>
      } */}

        <div>
          <Editor
            className="topic-editor"
            content={content}
            inEditMode={inEditMode || false}
            readOnly={inEditMode ? false : true}
            fullView={true}
            allow_edit={allow_edit}
            onChange={(rawContent) => {
              this.updateObject({
                content: rawContent,
              })
            }}
          />
        </div>

        <CommentsView topic={object} />

        {/* {fullView === true && (id > 0 && inEditMode !== true) ? <ArticleInfoComments
        comments={comments}
        user={this.props.user}
      /> : null} */}

        {/* {fullView === true && (id > 0 && inEditMode !== true) ? <TextEditor
        inEditMode={true}
        allow_edit={true}
        target_id={id}
        onMessageEdded={this.addMessage}
        clearOnSave={true}
      /> : null} */}
      </div>
    )
  }

  renderEditableView() {
    return this.renderDefaultView()
  }
}

export default withStyles(styles)((props) => <TopicView {...props} />)
