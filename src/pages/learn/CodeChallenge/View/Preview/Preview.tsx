import React from 'react'
import { PreviewProps } from './interfaces'
// import PropTypes from 'prop-types';
import { CodeChallengePreviewStyled } from './styles'

// import { previewMounted } from '../redux';

const mainId = 'fcc-main-frame'

const Preview: React.FC<PreviewProps> = (props) => {
  // static propTypes = {
  //   className: PropTypes.string,
  //   disableIframe: PropTypes.bool,
  //   // previewMounted: PropTypes.func.isRequired
  // };

  // constructor(...props) {
  //   super(...props);

  //   this.state = {
  //     iframeStatus: props.disableIframe
  //   };
  // }

  // const [iframeStatus, setIframeStatus] = useState(props.disableIframe);

  // // componentDidMount() {
  // //   this.props.previewMounted();
  // // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.disableIframe !== prevProps.disableIframe) {
  //     // eslint-disable-next-line react/no-did-update-set-state
  //     this.setState({ iframeStatus: !this.state.iframeStatus });
  //   }
  // }

  const iframeToggle = props.iframeStatus ? 'disable' : 'enable'
  return (
    <CodeChallengePreviewStyled
      className={`challenge-preview ${iframeToggle}-iframe`}
    >
      <iframe
        className={'challenge-preview-frame'}
        id={mainId}
        title="Challenge Preview"
      />
    </CodeChallengePreviewStyled>
  )
}

export default Preview
