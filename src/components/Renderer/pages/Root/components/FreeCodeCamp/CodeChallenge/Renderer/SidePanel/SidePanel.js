import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SidePanel extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <div className="instructions-panel" role="complementary" tabIndex="-1">
        SidePanel
        {/* <div>
          <ChallengeTitle isCompleted={isChallengeCompleted}>
            {title}
          </ChallengeTitle>
          <ChallengeDescription
            description={description}
            instructions={instructions}
            section={section}
          />
        </div>
        {showToolPanel && <ToolPanel guideUrl={guideUrl} videoUrl={videoUrl} />}
        <TestSuite tests={tests} /> */}
      </div>
    )
  }
}

export default SidePanel
