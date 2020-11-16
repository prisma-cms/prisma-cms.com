import React from 'react'
// import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles'

import Typography from 'material-ui/Typography'

import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
// import Chip from 'material-ui/Chip'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'

// import { Uploader } from '@prisma-cms/ui'

// import { UserLink, ProjectLink, Link, Grid } from '@modxclub/ui'

// TODO: Надо переписать зависимость, чтобы не использовался react-apollo
import {
  styles as baseStyles,
  ProjectView as PrismaCmsCooperationProjectView,
} from 'src/components/@prisma-cms/cooperation/components/pages/Projects/View/Project'

// import Link from 'next/link'
import { ProjectProps, ProjectState } from './interfaces'
import UserLink from 'src/uikit/Link/User'
import { UikitUserLinkAvatarSize } from 'src/uikit/Link/User/interfaces'
import Grid from 'src/uikit/Grid'
import ProjectLink from 'src/uikit/Link/Project'

export const styles = () => {
  const styles = baseStyles()

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

export class ProjectView<
  P extends ProjectProps = ProjectProps,
  S extends ProjectState = ProjectState
> extends PrismaCmsCooperationProjectView<P, S> {
  // static propTypes = {
  //   ...PrismaCmsCooperationProjectView.propTypes,
  //   classes: PropTypes.object.isRequired,
  //   showDetails: PropTypes.bool.isRequired,
  //   tasksLimit: PropTypes.number,
  // }

  static defaultProps = {
    ...PrismaCmsCooperationProjectView.defaultProps,
    showDetails: false,
  }

  renderHeader() {
    return null
  }

  handleOpen = (image: string | null | undefined) => {
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

  onUpload(r: any) {
    const { singleUpload } = r.data

    const { path: image } = singleUpload || {}

    if (singleUpload) {
      this.updateObject({
        image,
      })
    }
  }

  // renderResetButton() {
  //   const { id } = this.getObjectWithMutations() ?? {}

  //   return id ? super.renderResetButton() : null
  // }

  onClickHideDetails = () => {
    this.setState({
      editMembers: false,
    })
  }

  renderDefaultView() {
    const { classes } = this.props

    const object = this.getObjectWithMutations()

    const inEditMode = this.inEditMode()

    const { openedImage, editMembers } = this.state

    // const { user: currentUser } = this.context

    if (!object) {
      return null
    }

    const {
      name,
      url,
      // developer_id,
      // developer_uri = '/',
      // developer_title,
      Members,
      Resource,
      CreatedBy,

      // TODO Restore editing image
      // image: newImage,
    } = object ?? {}

    const { Image } = Resource || {}

    const { path: image } = Image || {}

    // image = newImage || image

    const thumb = image ? `/images/resized/big/${image}` : null

    /*
     * Участники проекта
     * */
    const project_members = Members || []
    const members: JSX.Element[] = []

    if (project_members.length) {
      project_members.map((member) => {
        const { id, User } = member

        members.push(
          <UserLink key={id} user={User} size={UikitUserLinkAvatarSize.small} />
        )
      }, this)
    }

    /*
     * Используемые компоненты
     TODO Подумать на счет возвращения функционала дополнений
     * */
    // const extras:  JSX.Element[] = []

    // if (object.extras && object.extras.length) {
    //   object.extras.map(function (extra) {
    //     extras.push(
    //       <Chip
    //         key={extra.id}
    //         style={{
    //           margin: 4,
    //         }}
    //         label={extra.pagetitle}
    //       ></Chip>
    //     )
    //   }, this)
    // }

    const dialog_actions = []

    if (url) {
      dialog_actions.push(
        <Button
          key="link"
          href={url}
          target="_blank"
          rel="nofollow"
          color="secondary"
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
        <div className={classes?.header}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={inEditMode}></Grid>

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
                padding: 3,
              }}
            >
              <ProjectLink object={object}>
                <Typography variant="title">{name}</Typography>
              </ProjectLink>
            </Typography>
          )}
        </CardContent>

        <CardContent>
          <div className="overlay">
            {/* 
            TODO: Restore uploader
            {inEditMode && currentUser ? (
              <Uploader
                onUpload={this.onUpload}
                inEditMode={inEditMode}
                helperText="Для загрузки перетащите файл сюда"
                classes={{
                  inputRoot: classes?.inputRoot,
                }}
              ></Uploader>
            ) : null} */}

            {thumb ? (
              <img
                className={classes?.thumb}
                src={thumb}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => {
                  this.handleOpen(image)
                }}
              />
            ) : null}
          </div>
        </CardContent>

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
        </CardContent>

        {/* 
        TODO Restore Developers
        {developer_id ? (
          <CardContent>
            Компания-разработчик
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <Link href={developer_uri}>
                <a
                  style={{
                    textDecoration: 'none',
                  }}
                  title={developer_title}
                >
                  <Chip label={developer_title} className="link" />
                </a>
              </Link>
            </div>
          </CardContent>
        ) : null}
         */}

        {members && members.length ? (
          <CardContent>
            <Typography variant="subheading">
              Участники проекта{' '}
              {editMembers ? (
                <Button onClick={this.onClickHideDetails}>Скрыть детали</Button>
              ) : null}
            </Typography>

            <div className={classes?.memberLinks}>{members}</div>
          </CardContent>
        ) : null}

        {this.renderTasks()}

        {/* {extras.length ? (
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
        ) : null} */}

        {/* 
          TODO: часть свойств диалога не актуальные, я их закомментировал.
          Если функционал пострадает, надо будет восстановить
        */}
        <Dialog
          title={name}
          onClose={this.handleClose}
          // modal={false}
          // contentStyle={{
          //   maxWidth: '100%',
          // }}
          open={this.state.open && openedImage ? true : false}
          // autoScrollBodyContent={true}
          // actions={dialog_actions}
        >
          <DialogContent>
            {openedImage ? (
              <img className={classes?.imageOpened} src={openedImage} />
            ) : null}
          </DialogContent>
          <DialogActions>{dialog_actions}</DialogActions>
        </Dialog>
      </Card>
    )
  }
}

// TODO Разобраться почему здесь без ошибок типизации
export default withStyles(styles)((props: ProjectProps) => (
  <ProjectView {...props} />
))
