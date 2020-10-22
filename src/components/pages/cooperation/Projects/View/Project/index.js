import React from 'react'
import PropTypes from 'prop-types'

// import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import withStyles from 'material-ui/styles/withStyles'

import Typography from 'material-ui/Typography'

import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'

import { Uploader } from '@prisma-cms/ui'

import { UserLink, ProjectLink, Link, Grid } from '@modxclub/ui'

import {
  styles as baseStyles,
  ProjectView as PrismaCmsCooperationProjectView,
} from '@prisma-cms/cooperation/lib/components/pages/Projects/View/Project'

export const styles = (theme) => {
  const styles = baseStyles(theme)

  const { root, ...other } = styles

  return {
    root: {
      ...root,
      height: '100%',
    },
    ...other,
    header: {
      padding: '15px 15px 0',
    },
    thumb: {
      width: '100%',
      maxWidth: 600,
      cursor: 'pointer',
    },
    imageOpened: {
      maxWidth: '100%',
    },
    memberLinks: {
      '& > div': {
        marginRight: 10,
      },
    },
    inputRoot: {
      marginLeft: 24,
    },
  }
}

export class ProjectView extends PrismaCmsCooperationProjectView {
  static propTypes = {
    ...PrismaCmsCooperationProjectView.propTypes,
    classes: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
    tasksLimit: PropTypes.number,
  }

  static defaultProps = {
    ...PrismaCmsCooperationProjectView.defaultProps,
    showDetails: false,
  }

  // static contextTypes = {
  //   ...PrismaCmsCooperationProjectView.contextTypes,
  //   openLoginForm: PropTypes.func.isRequired,
  // };

  renderHeader() {
    return null
  }

  // canEdit() {

  //   const {
  //     user: currentUser,
  //   } = this.context;

  //   const {
  //     id: currentUserId,
  //     sudo,
  //   } = currentUser || {};

  //   const {
  //     id,
  //     CreatedBy,
  //   } = this.getObjectWithMutations() || {};

  //   const {
  //     id: createdById,
  //   } = CreatedBy || {}

  //   return !id || (createdById && createdById === currentUserId) || sudo === true;
  // }

  // save() {

  //   const {
  //     user: currentUser,
  //     openLoginForm,
  //   } = this.context;

  //   if (!currentUser) {

  //     return openLoginForm();
  //   }

  //   return super.save();
  // }

  // getCacheKey() {

  //   const {
  //     id,
  //   } = this.getObject() || {};

  //   return `project_${id || "new"}`;
  // }

  handleOpen = (image) => {
    const thumb = image ? `/images/resized/big/${image}` : null

    if (!thumb) {
      return false
    }

    this.setState({
      open: true,
      openedImage: thumb,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      openedImage: undefined,
    })
  }

  // renderHeader() {

  //   return null;
  // }

  onUpload(r) {
    const { singleUpload } = r.data

    const { path: image } = singleUpload || {}

    if (singleUpload) {
      this.updateObject({
        image,
      })
    }
  }

  renderResetButton() {
    const { id } = this.getObjectWithMutations() || {}

    return id ? super.renderResetButton() : null
  }

  renderDefaultView() {
    const { classes } = this.props

    const object = this.getObjectWithMutations()

    const inEditMode = this.isInEditMode()

    const { openedImage, editMembers } = this.state

    const {
      user: currentUser,
      // updateProject,
      // saveProject,
    } = this.context

    if (!object) {
      return null
    }

    const {
      name,
      url,
      developer_id,
      developer_uri = '/',
      developer_title,
      Members,
      Resource,
      CreatedBy,

      image: newImage,
    } = object

    const { Image } = Resource || {}

    let { path: image } = Image || {}

    image = newImage || image

    const thumb = image ? `/images/resized/middle/${image}` : null

    /*
     * Участники проекта
     * */
    const project_members = Members || []
    const members = []

    if (inEditMode) {
      // members.push(<Chip
      //   key="create"
      //   className="link"
      //   style={{
      //     margin: 4,
      //   }}
      //   label={project_members.length ? "Редактировать участников" : "Добавить участника"}
      //   avatar={<MembersAvatar />}
      //   onClick={event => {
      //     this.setState({
      //       editMembers: true,
      //     });
      //   }}
      // >
      // </Chip>);
    }

    if (project_members.length) {
      project_members.map(function (member) {
        const { id, User } = member

        members.push(<UserLink key={id} user={User} size="small" />)
      }, this)
    }

    /*
     * Используемые компоненты
     * */
    const extras = []

    if (object.extras && object.extras.length) {
      object.extras.map(function (extra) {
        extras.push(
          <Chip
            key={extra.id}
            style={{
              margin: 4,
            }}
            label={extra.pagetitle}
          ></Chip>
        )
      }, this)
    }

    const dialog_actions = []

    if (this.state.url != '') {
      dialog_actions.push(
        <Button
          key="link"
          href={this.state.url}
          target="_blank"
          rel="nofollow"
          secondary={true}
        >
          Перейти на сайт
        </Button>
      )
    }

    dialog_actions.push(
      <Button key="close" onClick={this.handleClose}>
        Закрыть
      </Button>
    )

    return (
      <Card
        className="portfolio-card__wrapper"
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        {/* <CardHeader
        title={<Link
          to={`/profile/${author_username}`}
          style={{
            textDecoration: 'none',
          }}
        >
          {author_fullname || author_username}
        </Link>}
        // subheader={companies && <CompaniesList companies={companies} /> || undefined}
        avatar={<div>

          {this.getButtons()}

          {CreatedBy ?
            <UserLink
              user={CreatedBy}
            /> : null
          }

        </div>}
      /> */}

        <div className={classes.header}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={inEditMode}>
              {/* {inEditMode
              ?
              this.getTextField({
                name: "name",
                fullWidth: true,
              })
              :

              projectId ? <ProjectLink
                object={object}
              />
                :
                null
            } */}
            </Grid>

            <Grid item>{this.getButtons()}</Grid>

            <Grid item xs={!inEditMode}></Grid>

            <Grid item>{CreatedBy ? <UserLink user={CreatedBy} /> : null}</Grid>
          </Grid>
        </div>

        <CardContent>
          {inEditMode ? (
            this.getTextField({
              label: 'Название проекта',
              name: 'name',
            })
          ) : (
            <Typography
              variant="title"
              style={{
                // textAlign: 'right',
                padding: 3,
              }}
            >
              <ProjectLink
                object={object}
                // title={longtitle}
                // className="underline-none"
              >
                <Typography variant="title">{name}</Typography>
              </ProjectLink>
            </Typography>
          )}
        </CardContent>

        <CardMedia>
          <div className="overlay">
            {inEditMode && currentUser ? (
              <Uploader
                onUpload={(result) => this.onUpload(result)}
                inEditMode={inEditMode}
                helperText="Для загрузки перетащите файл сюда"
                classes={{
                  inputRoot: classes.inputRoot,
                }}
              ></Uploader>
            ) : null}

            {thumb ? (
              <img
                className={classes.thumb}
                src={thumb}
                onClick={() => {
                  this.handleOpen(image)
                }}
              />
            ) : null}
          </div>
        </CardMedia>

        <CardContent>
          {inEditMode ? (
            this.getTextField({
              label: 'URL-адрес сайта',
              name: 'url',
            })
          ) : (
            <Typography
              variant="subheading"
              style={{
                textAlign: 'right',
                padding: 5,
              }}
            >
              {url ? (
                <a href={url} target="_blank" title={name} rel="noreferrer">
                  {url}
                </a>
              ) : null}
            </Typography>
          )}

          {/* {object.content} */}
        </CardContent>

        {developer_id ? (
          <CardContent>
            Компания-разработчик
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <Link
                to={developer_uri}
                style={{
                  textDecoration: 'none',
                }}
                title={developer_title}
              >
                <Chip label={developer_title} className="link" />
              </Link>
            </div>
          </CardContent>
        ) : null}

        {members && members.length ? (
          <CardContent>
            <Typography variant="subheading">
              Участники проекта{' '}
              {editMembers ? (
                <Button
                  onClick={() => {
                    this.setState({
                      editMembers: false,
                    })
                  }}
                >
                  Скрыть детали
                </Button>
              ) : null}
            </Typography>

            <div className={classes.memberLinks}>{members}</div>
          </CardContent>
        ) : null}

        {this.renderTasks()}

        {extras.length ? (
          <CardContent>
            Используемые компоненты
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {extras}
            </div>
          </CardContent>
        ) : null}

        <Dialog
          title={name}
          onClose={this.handleClose}
          modal={false}
          contentStyle={{
            maxWidth: '100%',
          }}
          open={this.state.open && openedImage ? true : false}
          autoScrollBodyContent={true}
          actions={dialog_actions}
        >
          <img
            className={classes.imageOpened}
            src={openedImage}
            style={
              {
                // minHeight: typeof window != "undefined" ? window.innerHeight * 0.8 : undefined,
              }
            }
          />
        </Dialog>
      </Card>
    )
  }
}

export default withStyles(styles)((props) => <ProjectView {...props} />)
