import React from 'react'

import PrismaCmsPageLayout from '@prisma-cms/front/lib/components/pages/layout'

export default class PageLayout extends PrismaCmsPageLayout {
  render(content) {
    // console.log("PageLayout this", this);

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
