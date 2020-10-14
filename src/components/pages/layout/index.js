import React from 'react'

import PropTypes from 'prop-types'

import PrismaCmsPageLayout from '@prisma-cms/front/lib/components/pages/layout'

import { UserLink, TaskLink, Editor, ProjectLink } from '@modxclub/ui'

export default class PageLayout extends PrismaCmsPageLayout {
  static propTypes = {
    ...PrismaCmsPageLayout.propTypes,
    UserLink: PropTypes.func.isRequired,
    TaskLink: PropTypes.func.isRequired,
    Editor: PropTypes.func.isRequired,
    ProjectLink: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    ...PrismaCmsPageLayout.childContextTypes,
    UserLink: PropTypes.func,
    TaskLink: PropTypes.func,
    Editor: PropTypes.func,
    ProjectLink: PropTypes.func,
  }

  static defaultProps = {
    ...PrismaCmsPageLayout.defaultProps,
    UserLink,
    TaskLink,
    Editor,
    ProjectLink,
  }

  render(content) {
    return content === null
      ? null
      : super.render(
          <div
            style={{
              padding: '20px 10px',
              maxWidth: 1260,
              width: '100%',
              margin: '0 auto',
              height: '100%',
            }}
          >
            {content}
          </div>
        )
  }
}
