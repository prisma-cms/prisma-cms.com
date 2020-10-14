import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

class ChallengesRenderer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    challenges: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }

  state = {
    opened: false,
  }

  render() {
    const { name, challenges } = this.props

    const { opened } = this.state

    if (!challenges || !challenges.length) {
      return null
    }

    return (
      <div>
        <p
          onClick={(event) => {
            this.setState({
              opened: !opened,
            })
          }}
          style={{
            cursor: 'pointer',
          }}
        >
          <i>⮱</i> {name}
        </p>

        {opened
          ? challenges.map((n, index) => {
              const { id, name } = n

              return (
                <p key={id || index}>
                  <Link to={`/freecodecamp/challenges/${id}/`}>{name}</Link>
                </p>
              )
            })
          : null}
      </div>
    )
  }
}

export default ChallengesRenderer
