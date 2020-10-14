import React from 'react'

import moment from 'moment'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable'

import Forum from '../../../../view/forum'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui'

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

class BlogView extends EditableView {
  canEdit() {
    const { user: currentUser } = this.context

    const { id: currentUserId, sudo } = currentUser || {}

    const { id, CreatedBy } = this.getObjectWithMutations() || {}

    const { id: createdById } = CreatedBy || {}

    return (
      !id || (createdById && createdById === currentUserId) || sudo === true
    )
  }

  renderHeader() {
    const { Grid, UserLink } = this.context

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
                    label: 'Название блога',
                    helperText: 'Укажите название блога',
                  })
                ) : (
                  <Typography variant="display1" component="h1">
                    {this.getTitle()}
                  </Typography>
                )}
              </Grid>

              <Grid item>{this.getButtons()}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderDefaultView() {
    const { ...other } = this.props

    const { id: blogId, name, type } = this.getObjectWithMutations()

    let forum = null

    if (blogId) {
      forum = (
        <Forum
          title={
            (name && (
              <Typography variant="subheading">
                {`Топики в блоге "${name}"`}
              </Typography>
            )) ||
            undefined
          }
          where={{
            Blog: {
              id: blogId,
            },
          }}
          {...other}
          addObject={
            type === 'Blog'
              ? () => {
                  const {
                    router: { history },
                  } = this.context
                  history.push(`/add-topic.html?blogID=${blogId}`)
                }
              : undefined
          }
        />
      )
    }

    return forum
  }

  renderEditableView() {
    return this.renderDefaultView()
  }
}

export default withStyles(styles)((props) => <BlogView {...props} />)
