import React, { Fragment } from 'react'

import EditableView from 'apollo-cms/dist/DataView/Object/Editable'

import withStyles from 'material-ui/styles/withStyles'
import Typography from 'material-ui/Typography'

import Grid from 'src/uikit/Grid'
import { ProjectViewProps, ProjectViewState } from './interfaces'

// import TasksListView from "./Tasks";

export * from './interfaces'

export const styles = () => {
  return {
    root: {},
  }
}

// export class ProjectView<P extends ProjectViewProps = ProjectViewProps, S extends ProjectViewState = ProjectViewState>
// extends EditableView<P, S> {

export class ProjectView<
  P extends ProjectViewProps = ProjectViewProps,
  S extends ProjectViewState = ProjectViewState
> extends EditableView<P, S> {
  // static propTypes = {
  //   // eslint-disable-next-line react/forbid-foreign-prop-types
  //   ...EditableView.propTypes,
  //   classes: PropTypes.object.isRequired,
  //   showDetails: PropTypes.bool.isRequired,
  // };

  // static defaultProps = {
  //   ...EditableView.defaultProps,
  //   showDetails: false,
  // };

  // static contextTypes = {
  //   ...EditableView.contextTypes,
  //   openLoginForm: PropTypes.func.isRequired,
  // };

  canEdit() {
    const { user: currentUser } = this.context

    const { id: currentUserId, sudo } = currentUser || {}

    const { id, CreatedBy } = this.getObjectWithMutations() ?? {}

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

  getCacheKey() {
    const { id } = this.getObject() ?? {}

    return `project_${id || 'new_project'}`
  }

  renderHeader(): React.ReactNode {
    const { classes } = this.props

    const object = this.getObjectWithMutations()

    const {
      id: projectId,
      CreatedBy,
      // createdAt,
      // Tasks,
    } = object ?? {}

    const inEditMode = this.inEditMode()

    const { UserLink, ProjectLink } = this.context

    return (
      <div className={classes?.header}>
        <Grid container spacing={16}>
          <Grid item xs>
            <Grid container alignItems="center">
              <Grid item xs={inEditMode}>
                {inEditMode ? (
                  this.getTextField({
                    name: 'name',
                    fullWidth: true,
                  })
                ) : projectId ? (
                  <ProjectLink object={object} />
                ) : null}
              </Grid>

              <Grid item>{this.getButtons()}</Grid>

              <Grid item xs={!inEditMode}></Grid>

              <Grid item>
                {CreatedBy ? <UserLink user={CreatedBy} /> : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderTasks() {
    // const {
    //   showDetails,
    // } = this.props;

    const project = this.getObjectWithMutations()

    if (!project) {
      return null
    }

    const { Link } = this.context

    const {
      id: projectId,
      // ProjectTasks,
    } = project ?? {}

    // const Tasks = ProjectTasks ? ProjectTasks.map(({ Task }) => Task).filter(n => n) : [];

    return (
      <Fragment>
        <Typography variant="subheading">
          Задачи в проекте{' '}
          {projectId ? (
            <Link to={`/tasks/create/${projectId}`}>Добавить</Link>
          ) : null}
        </Typography>

        {/* 
      TODO: restore tasks
      {
        Tasks && Tasks.length ?
          <Grid
            item
            xs={12}
          >


            <TasksListView
              project={project}
              tasks={Tasks}
              showDetails={showDetails}
            />

          </Grid>
          : null
      } */}
      </Fragment>
    )
  }

  renderDefaultView() {
    // const {
    //   // classes,
    //   showDetails,
    // } = this.props;

    const project = this.getObjectWithMutations()

    if (!project) {
      return null
    }

    let details

    // TODO Restore tasks
    // if (showDetails) {

    //   details = <Fragment>

    //     {this.renderTasks()}

    //   </Fragment>

    // }

    return <Grid container>{details}</Grid>
  }

  renderEditableView() {
    return this.renderDefaultView()
  }

  renderResetButton() {
    const { id } = this.getObjectWithMutations() ?? {}

    return id ? super.renderResetButton() : null
  }

  render() {
    const object = this.getObjectWithMutations()

    if (!object) {
      return null
    }

    const { classes } = this.props

    return <div className={classes?.root}>{super.render()}</div>
  }
}

export default withStyles(styles)((props: ProjectViewProps) => (
  <ProjectView {...props} />
))
