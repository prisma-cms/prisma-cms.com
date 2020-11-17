import React from 'react'

import Editor from 'src/uikit/Editor'

import EditableView from 'apollo-cms/dist/DataView/Object/Editable'

// import withStyles from "material-ui/styles/withStyles";
import { Typography } from 'material-ui'
import SendIcon from 'material-ui-icons/Send'

import Grid from 'src/uikit/Grid'

import CommentLink from 'src/uikit/Link/Comment'

import { UikitCommentProps } from './interfaces'
import UserLink from 'src/uikit/Link/User'
import { PrismaCmsEditorRawContent } from '@prisma-cms/editor'
import { UikitCommentStyled } from './styles'
import {
  CreateCommentProcessorDocument,
  UpdateCommentProcessorDocument,
} from 'src/modules/gql/generated'
// import moment from 'moment';

export * from './interfaces'

class UikitComment extends EditableView<UikitCommentProps> {
  static defaultProps = {
    ...EditableView.defaultProps,
    SaveIcon: SendIcon,
    linkType: 'comment',
  }

  getMutation(data: Record<string, any> | null | undefined) {
    // console.log("getMutation getObject", { ...this.getObject() });

    // const mutate = async (props) => {

    //   console.log("getMutation mutate props", props);

    //   return {};
    // }

    let mutation

    const id = this.getObjectWithMutations()?.id

    if (id) {
      mutation = UpdateCommentProcessorDocument
    } else {
      mutation = CreateCommentProcessorDocument
    }

    return {
      ...super.getMutation(data),
      mutation,
    }
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

  save() {
    const { user: currentUser, openLoginForm } = this.context

    if (!currentUser) {
      return openLoginForm()
    }

    return super.save()
  }

  renderHeader() {
    const { linkType } = this.props

    const object = this.getObjectWithMutations()

    const {
      id: commentId,
      CreatedBy,
      // createdAt,
    } = object || {}

    // const inEditMode = this.inditMode();

    if (!commentId) {
      return (
        <Typography variant="subheading" className={'addCommentTitle'}>
          Добавить комментарий
        </Typography>
      )
    }

    return (
      <div className={'header'}>
        <Grid container spacing={16}>
          {CreatedBy ? (
            <Grid item>
              <UserLink
                user={CreatedBy}
                showName={false}
                // avatarProps={{
                //   size: "medium",
                // }}
              />
            </Grid>
          ) : null}

          <Grid item xs>
            <Grid container>
              <Grid item xs>
                {CreatedBy ? (
                  <UserLink user={CreatedBy} withAvatar={false} />
                ) : null}
              </Grid>

              <Grid item>
                {/* {createdAt ? <Typography
                  variant="caption"
                  color="textSecondary"
                >
                  {moment(createdAt).format('lll')}
                </Typography> : null} */}

                {commentId ? (
                  <CommentLink object={object} linkType={linkType} />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  onEditComment = (rawContent: PrismaCmsEditorRawContent) => {
    this.updateObject({
      content: rawContent,
    })
  }

  renderDefaultView() {
    const comment = this.getObjectWithMutations()

    if (!comment) {
      return null
    }

    // TODO add custom scalar in API
    const content = comment.content as
      | PrismaCmsEditorRawContent
      | null
      | undefined

    const readOnly = !this.inEditMode()

    const editor = (
      <Editor
        // className="topic-editor"
        editorKey="comment"
        value={content || undefined}
        readOnly={readOnly}
        // fullView={true}
        // allow_edit={allow_edit}
        onChange={this.onEditComment}
      />
    )

    return (
      <Grid container>
        <Grid item xs>
          {editor}
        </Grid>

        <Grid item>{this.getButtons()}</Grid>
      </Grid>
    )
  }

  renderEditableView() {
    return this.renderDefaultView()

    // return <Grid
    //   container
    // >

    //   <Grid
    //     item
    //     xs
    //   >
    //     {this.renderDefaultView()}
    //   </Grid>

    //   <Grid
    //     item
    //   >

    //     {this.getButtons()}

    //   </Grid>

    // </Grid>
  }

  renderResetButton() {
    const { id } = this.getObjectWithMutations() || {}

    return id ? super.renderResetButton() : null
  }

  render() {
    const { className } = this.props

    const object = this.getObjectWithMutations()

    if (!object) {
      return null
    }

    return (
      <UikitCommentStyled className={className}>
        {super.render()}
      </UikitCommentStyled>
    )
  }
}

export default UikitComment

// export default withStyles(styles)(props => <UikitComment
//   {...props}
// />);
