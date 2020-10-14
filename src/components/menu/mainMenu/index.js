import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
// import IconButton from 'material-ui/IconButton';

import { Grid } from '@modxclub/ui'

// import CreateIcon from 'material-ui-icons/Create';

// import UserItem from "@prisma-cms/front/lib/components/App/Renderer/MainMenu/User";
import { styles as defaultStyles } from '@prisma-cms/front/lib/components/App/Renderer/MainMenu'
import Language from '@prisma-cms/front/lib/components/Language'
import UserItem from './User'

import { Link } from 'react-router-dom'
import { Notices } from '@prisma-cms/society'
// import { IconButton } from 'material-ui';

import PrismaCmsComponent from '@prisma-cms/component'

import { CallRequestButtons } from '@prisma-cms/webrtc'

import { Timer } from '@prisma-cms/cooperation'

export const styles = (theme) => {
  const {
    palette: {
      background: { default: backgroundColor },
    },
  } = theme

  return {
    ...defaultStyles,
    root: {
      // flexGrow: 1,
      backgroundColor,
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: 5,
      // marginRight: -12,
    },
  }
}

export const locales = {
  ru: {
    values: {
      Signin: 'Войти',
      Signout: 'Выйти',
      Chats: 'Чаты',
      Users: 'Участники',
      Ethereum: 'Ethereum',
      'API Schema': 'API схема',
      Topics: 'Топики',
      Blogs: 'Блоги',
      Projects: 'Проекты',
      Tasks: 'Задачи',
      Timers: 'Таймеры',
      Technologies: 'Технологии',
    },
  },
}

export class MainMenu extends PrismaCmsComponent {
  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    locales,
  }

  render() {
    const {
      classes,
      // ...other
    } = this.props

    const {
      user: currentUser,
      logout,
      // router: {
      //   history,
      // },
    } = this.context

    const { id: userId, Timers } = currentUser || {}

    const [ActiveTimer] = Timers || []

    return (
      <AppBar
        // position="static"
        color="default"
        className={classes.root}
      >
        <Toolbar>
          {/* <Button color="inherit">Login</Button> */}

          <Grid container alignItems="center" spacing={16}>
            <Grid item xs={12} sm>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                <Link to="/">PrismaCMS</Link>
              </Typography>
            </Grid>

            <Grid item>
              <Link to="/technologies/">
                <Typography>{this.lexicon('Technologies')}</Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/topics/">
                <Typography>{this.lexicon('Topics')}</Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/blogs/">
                <Typography>{this.lexicon('Blogs')}</Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/chat-rooms/">
                <Typography component="span" className={classes.link}>
                  {this.lexicon('Chats')}
                </Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/people/">
                <Typography>{this.lexicon('Users')}</Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/projects/">
                <Typography>{this.lexicon('Projects')}</Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/tasks/?status_in=New&status_in=Accepted&status_in=Progress&status_in=Paused&status_in=RevisionsRequired&status_in=Discuss&status_in=Approved&status_in=Done">
                <Typography>{this.lexicon('Tasks')}</Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/timers/">
                <Typography>{this.lexicon('Timers')}</Typography>
              </Link>
            </Grid>

            {/* 
            <Grid
              item
            >
              <Link
                to="/eth-transactions"
              >
                <Typography>
                  {this.lexicon("Ethereum")}
                </Typography>
              </Link>

            </Grid> */}

            <Grid item>
              <a
                href="/graphql-voyager/"
                rel="noindex,nofollow"
                target="_blank"
              >
                <Typography>{this.lexicon('API Schema')}</Typography>
              </a>
            </Grid>

            <Grid item>
              <a
                href="https://api.prisma-cms.com"
                rel="noindex nofollow noopener noreferrer"
                target="_blank"
              >
                <Typography>{this.lexicon('API')}</Typography>
              </a>
            </Grid>

            <Grid item xs></Grid>

            <Language />

            {/* <Grid
              key="write"
              item
            >
              <IconButton
                onClick={event => {
                  history.push("/add-topic.html");
                }}
              >
                <CreateIcon />
              </IconButton>

            </Grid> */}

            {currentUser ? (
              <Fragment>
                <Grid key="callRequests" item>
                  <CallRequestButtons
                    key={userId}
                    classes={{
                      icon: classes.link,
                    }}
                  />
                </Grid>

                {ActiveTimer ? (
                  <Grid key="timer" item>
                    <Timer timer={ActiveTimer} iconClassName={classes.link} />
                  </Grid>
                ) : null}

                <Grid key="notifications" item>
                  <Notices
                    key={userId}
                    user={currentUser}
                    classes={{
                      icon: classes.link,
                    }}
                  />
                </Grid>

                <Grid key="user" item>
                  <UserItem key={userId} user={currentUser} classes={classes} />
                </Grid>
                <Grid key="logout" item>
                  <a href="javascript:;" onClick={() => logout()}>
                    {this.lexicon('Signout')}
                  </a>
                </Grid>
              </Fragment>
            ) : (
              <Grid key="login" item>
                <Button
                  onClick={() => {
                    const { openLoginForm } = this.context
                    openLoginForm()
                  }}
                >
                  <Typography component="span">
                    {this.lexicon('Signin')}
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)((props) => <MainMenu {...props} />)
