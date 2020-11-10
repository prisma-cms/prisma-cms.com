import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
// import IconButton from 'material-ui/IconButton';

import Grid from 'src/components/ui/Grid'

// import CreateIcon from 'material-ui-icons/Create';

// import UserItem from "@prisma-cms/front/lib/components/App/Renderer/MainMenu/User";
// import { styles as defaultStyles } from '@prisma-cms/front/lib/components/App/Renderer/MainMenu'
// import Language from '@prisma-cms/front/lib/components/Language'
import UserItem from './User'

// import { Link } from 'react-router-dom'
import Link from 'next/link'
// import { Notices } from '@prisma-cms/society'

import PrismaCmsComponent from '@prisma-cms/component'
import { MainMenuProps, MainMenuState } from './interfaces'

// import { CallRequestButtons } from '@prisma-cms/webrtc'

// import { Timer } from '@prisma-cms/cooperation'

// export const defaultStyles = theme => {

//   const {
//     palette: {
//       type: paletteType,
//     },
//   } = theme;

//   return {
//     root: {

//       // Fix contrast
//       // "& a, & button": {
//       //   "&, & *": {
//       //     color: paletteType === "light" ? "#fff" : undefined,
//       //   },
//       // },
//     },
//   }
// }

export const styles = (theme: any) => {
  const {
    palette: {
      background: { default: backgroundColor },
      type: paletteType,
    },
  } = theme

  return {
    // ...defaultStyles,
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
    link: {
      color: paletteType === 'light' ? '#fff' : undefined,
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

export class MainMenu extends PrismaCmsComponent<MainMenuProps, MainMenuState> {
  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    locales,
  }

  // componentDidMount() {
  //   console.log('MainMenu componentDidMount', { ...this.props });
  // }

  // componentDidUpdate() {
  //   console.log('MainMenu componentDidUpdate', { ...this.props });
  //   console.log('MainMenu componentDidUpdate context', this.context);
  // }

  // componentWillUnmount(){
  //   console.log('MainMenu componentWillUnmount', { ...this.props });
  // }

  logout = (event: React.MouseEvent) => {
    const { logout } = this.context
    event.preventDefault()
    return logout()
  }

  openLoginForm = () => {
    const { openLoginForm } = this.context

    return openLoginForm()
  }

  render() {
    const { classes, user: currentUser } = this.props

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
                <Link href="/">PrismaCMS</Link>
              </Typography>
            </Grid>

            <Grid item>
              <Link href="/technologies/">
                <a>
                  <Typography>{this.lexicon('Technologies')}</Typography>
                </a>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/topics/">
                <a title={this.lexicon('Topics')}>
                  <Typography>{this.lexicon('Topics')}</Typography>
                </a>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/blogs/">
                <a>
                  <Typography>{this.lexicon('Blogs')}</Typography>
                </a>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/chat-rooms/">
                <a>
                  <Typography>{this.lexicon('Chats')}</Typography>
                </a>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/people/">
                <a>
                  <Typography>{this.lexicon('Users')}</Typography>
                </a>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/projects/">
                <a>
                  <Typography>{this.lexicon('Projects')}</Typography>
                </a>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/tasks/?status_in=New&status_in=Accepted&status_in=Progress&status_in=Paused&status_in=RevisionsRequired&status_in=Discuss&status_in=Approved&status_in=Done">
                <a>
                  <Typography>{this.lexicon('Tasks')}</Typography>
                </a>
              </Link>
            </Grid>

            <Grid item>
              <Link href="/timers/">
                <a>
                  <Typography>{this.lexicon('Timers')}</Typography>
                </a>
              </Link>
            </Grid>

            {/* <Grid item>
              <a
                href="/graphql-voyager/"
                rel="noindex,nofollow"
                target="_blank"
              >
                <Typography>{this.lexicon('API Schema')}</Typography>
              </a>
            </Grid> */}

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

            {currentUser ? (
              <Fragment>
                <Grid key="callRequests" item>
                  {/* <CallRequestButtons
                    key={userId}
                    classes={{
                      icon: classes.link,
                    }}
                  /> */}
                </Grid>

                {ActiveTimer ? (
                  <Grid key="timer" item>
                    {/* <Timer timer={ActiveTimer} iconClassName={classes.link} /> */}
                  </Grid>
                ) : null}

                <Grid key="notifications" item>
                  {/* <Notices
                    key={userId}
                    user={currentUser}
                    classes={{
                      icon: classes.link,
                    }}
                  /> */}
                </Grid>

                <Grid key="user" item>
                  <UserItem key={userId} user={currentUser} classes={classes} />
                </Grid>
                <Grid key="logout" item>
                  <a href="#" onClick={this.logout}>
                    {this.lexicon('Signout')}
                  </a>
                </Grid>
              </Fragment>
            ) : (
              <Grid key="login" item>
                <Button onClick={this.openLoginForm}>
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

export default withStyles(styles as any)((props: MainMenuProps) => (
  <MainMenu {...props} />
))
