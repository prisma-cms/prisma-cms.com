import React, { useContext, useMemo } from 'react'

import { DesktopLayoutProps } from './interfaces'
import ReflexContainer from 'src/uikit/ReFlex/ReflexContainer'
import ReflexElement from 'src/uikit/ReFlex/ReflexElement'
import { DesktopLayoutStyled } from './styles'
import Context, { PrismaCmsContext } from '@prisma-cms/context'

const DesktopLayout: React.FC<DesktopLayoutProps> = (props) => {
  // static displayName = 'DesktopLayout';

  // static propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   challengeFile: PropTypes.shape({
  //     key: PropTypes.string
  //   }),
  //   editor: PropTypes.element,
  //   hasPreview: PropTypes.bool,
  //   instructions: PropTypes.element,
  //   preview: PropTypes.element,
  //   resizeProps: PropTypes.shape({
  //     onStopResize: PropTypes.func,
  //     onResize: PropTypes.func
  //   }),
  //   testOutput: PropTypes.element
  // };

  const {
    // classes,
    // resizeProps,
    instructions,
    challengeFile,
    editor,
    testOutput,
    hasPreview,
    preview,
  } = props

  const context = useContext(Context) as PrismaCmsContext

  return useMemo(() => {
    const user = context?.user

    return (
      <DesktopLayoutStyled>
        {!user ? (
          <div className="auth-reminder">
            <button onClick={context.openLoginForm}>Авторизуйтесь</button>,
            чтобы сохранить свой прогресс
          </div>
        ) : null}
        <ReflexContainer
          // className={[classes?.root, 'desktop-layout'].join(' ')}
          // orientation="vertical"
          flexDirection="row"
        >
          <ReflexElement flex={1}>{instructions}</ReflexElement>
          {/* <ReflexSplitter propagate={true} /> */}
          <ReflexElement flex={1}>
            {challengeFile && (
              <ReflexContainer key={challengeFile.key} flexDirection="column">
                <ReflexElement flex={1} overflow="hidden">
                  {editor}
                </ReflexElement>
                {/* <ReflexSplitter propagate={true} /> */}
                <ReflexElement flex={0.25}>{testOutput}</ReflexElement>
              </ReflexContainer>
            )}
          </ReflexElement>
          {/* {hasPreview && <ReflexSplitter propagate={true} />} */}
          {hasPreview && <ReflexElement flex={0.7}>{preview}</ReflexElement>}
        </ReflexContainer>
      </DesktopLayoutStyled>
    )
  }, [
    challengeFile,
    context.openLoginForm,
    context?.user,
    editor,
    hasPreview,
    instructions,
    preview,
    testOutput,
  ])
}

export default DesktopLayout
