import React from 'react'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

import Page from '../../../layout'

import { Link } from 'react-router-dom'

export default class Lesson1Page extends Page {
  constructor(props) {
    super(props)

    this.state = {
      ...super.state,
      open: false,
      vertical: null,
      horizontal: null,
    }
  }

  handleClick = (state) => () => {
    this.setState({ open: true, ...state })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { vertical, horizontal, open } = this.state

    return super.render(
      <div>
        <Button
          onClick={this.handleClick({ vertical: 'top', horizontal: 'left' })}
        >
          Top-Left
        </Button>
        <Button
          onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}
        >
          Top-Center
        </Button>
        <Button
          onClick={this.handleClick({ vertical: 'top', horizontal: 'right' })}
        >
          Top-Right
        </Button>
        <br />
        <Button
          onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })}
        >
          Bottom-Left
        </Button>
        <Button
          onClick={this.handleClick({
            vertical: 'bottom',
            horizontal: 'center',
          })}
        >
          Bottom-Center
        </Button>
        <Button
          onClick={this.handleClick({
            vertical: 'bottom',
            horizontal: 'right',
          })}
        >
          Bottom-Right
        </Button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />

        <div
          style={{
            margin: '20px 0 0 15px',
          }}
        >
          <Link to="/topics/react-js.-urok-№1.-byistryij-start-2616.html">
            Статья
          </Link>
          .
        </div>
      </div>
    )
  }
}
