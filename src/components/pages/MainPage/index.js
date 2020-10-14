import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import Page from '../layout'

import Forum from '../../view/forum'
import { Typography, Tabs, Tab } from 'material-ui'

import Comments from './Comments'
import Tasks from './Tasks'
import { withStyles } from 'material-ui'

import { ChatRoom } from '@prisma-cms/society'

const styles = () => {
  return {
    root: {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      overflow: 'auto',
    },
  }
}

export class MainPage extends Page {
  static propTypes = {
    ...Page.propTypes,
    classes: PropTypes.object.isRequired,
  }

  state = {
    ...super.state,
    tabIndex: 1,
  }

  setPageMeta() {
    return super.setPageMeta({
      title: 'Главная страница',
    })
  }

  renderOld() {
    const { Grid } = this.context

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} lg={8}>
          {this.renderTopics()}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6} lg={12}>
              {this.renderTimers()}
            </Grid>

            <Grid item xs={12} sm={6} lg={12}>
              {this.renderComments()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderTopics() {
    const { getQueryFragment } = this.context

    const { ...other } = this.props

    return <Forum getQueryFragment={getQueryFragment} {...other} />
  }

  renderComments() {
    return <Comments />
  }

  renderTimers() {
    const { Link } = this.context

    return (
      <Fragment>
        <Link to="/tasks" title="Задачи">
          <Typography variant="subheading">Активные задачи</Typography>
        </Link>

        <Tasks />
      </Fragment>
    )
  }

  renderMainChat() {
    return (
      <ChatRoom
        where={{
          code: 'public',
        }}
      />
    )
  }

  render() {
    const { classes } = this.props

    const { tabIndex } = this.state

    let tabContent

    switch (tabIndex) {
      case 0:
        tabContent = this.renderMainChat()

        break

      case 1:
        tabContent = this.renderTopics()

        break

      case 2:
        tabContent = this.renderComments()

        break

      case 3:
        tabContent = this.renderTimers()

        break

      case 4:
        tabContent = this.renderOld()

        break
    }

    const content = (
      <div className={classes.root}>
        <Tabs
          value={tabIndex}
          onChange={(event, tabIndex) => {
            this.setState({
              tabIndex,
            })
          }}
          scrollable
          scrollButtons="auto"
        >
          <Tab value={1} label="Публикации" />
          <Tab value={2} label="Комментарии" />
          <Tab value={0} label="Чат" />
          <Tab value={3} label="Активные задачи" />
          {/* <Tab
					value={4}
					label="Старая главная"
				/> */}
        </Tabs>

        <div className={classes.content}>{tabContent}</div>
      </div>
    )

    return super.render(content)
  }
}

export default withStyles(styles)((props) => <MainPage {...props} />)
