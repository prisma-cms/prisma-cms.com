/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { PureComponent, Suspense } from 'react'

import Loader from './Loader/Loader'

import dynamic from 'next/dynamic'
import { FccEditorProps, modeMap } from './interfaces'

export * from './interfaces'

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

// import { connect } from 'react-redux';
// import { createSelector } from 'reselect';

// import {
//   canFocusEditorSelector,
//   executeChallenge,
//   inAccessibilityModeSelector,
//   setEditorFocusability,
//   setAccessibilityMode,
//   updateFile
// } from '../redux';
// import { userSelector, isDonationModalOpenSelector } from '../../../redux';
// import { Loader } from '../../../components/helpers';

// const userSelector = () => {

//   return 'Test User';
// };

// const MonacoEditor = React.lazy(() => import('react-monaco-editor'));

// const mapStateToProps = createSelector(
//   canFocusEditorSelector,
//   inAccessibilityModeSelector,
//   isDonationModalOpenSelector,
//   userSelector,
//   (canFocus, accessibilityMode, open, { theme = 'default' }) => ({
//     canFocus: open ? false : canFocus,
//     inAccessibilityMode: accessibilityMode,
//     theme
//   })
// );

// const mapDispatchToProps = {
//   setEditorFocusability,
//   setAccessibilityMode,
//   executeChallenge,
//   updateFile
// };

let monacoThemesDefined = false
const defineMonacoThemes = (monaco: any) => {
  if (monacoThemesDefined) {
    return
  }
  monacoThemesDefined = true
  const yellowColor = 'FFFF00'
  const lightBlueColor = '9CDCFE'
  const darkBlueColor = '00107E'
  monaco.editor.defineTheme('vs-dark-custom', {
    base: 'vs-dark',
    inherit: true,
    colors: {
      'editor.background': '#2a2a40',
    },
    rules: [
      { token: 'delimiter.js', foreground: lightBlueColor },
      { token: 'delimiter.parenthesis.js', foreground: yellowColor },
      { token: 'delimiter.array.js', foreground: yellowColor },
      { token: 'delimiter.bracket.js', foreground: yellowColor },
    ],
  })
  monaco.editor.defineTheme('vs-custom', {
    base: 'vs',
    inherit: true,
    rules: [{ token: 'identifier.js', foreground: darkBlueColor }],
  })
}

class FccEditor<
  P extends FccEditorProps = FccEditorProps
> extends PureComponent<P> {
  // static propTypes = propTypes;

  static displayName = 'Editor'

  declare options: Record<string, any>

  declare _editor: any | null

  declare _domNode: any

  declare _outputNode: any

  declare _overlayWidget: any

  declare _outputWidget: any

  declare data: Record<string, any>

  constructor(props: P) {
    super(props)

    // TODO: is there any point in initializing this? It should be fine with
    // this.data = {}

    this.data = {
      model: null,
      state: null,
      viewZoneId: null,
      startEditDecId: null,
      endEditDecId: null,
      viewZoneHeight: null,
    }

    this.options = {
      fontSize: '18px',
      scrollBeyondLastLine: false,
      selectionHighlight: false,
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      renderIndentGuides: false,
      minimap: {
        enabled: false,
      },
      selectOnLineNumbers: true,
      wordWrap: 'on',
      scrollbar: {
        horizontal: 'hidden',
        vertical: 'visible',
        verticalHasArrows: false,
        useShadows: false,
        verticalScrollbarSize: 5,
      },
    }

    this._editor = null
    this.focusOnEditor = this.focusOnEditor.bind(this)
  }

  editorWillMount = (monaco: any) => {
    defineMonacoThemes(monaco)
  }

  editorDidMount = (editor: any, monaco: any) => {
    this._editor = editor
    const { challengeFiles, fileKey } = this.props
    editor.updateOptions({
      accessibilitySupport: this.props.inAccessibilityMode ? 'on' : 'auto',
    })
    // Users who are using screen readers should not have to move focus from
    // the editor to the description every time they open a challenge.
    if (this.props.canFocus && !this.props.inAccessibilityMode) {
      // TODO: only one Editor should be calling for focus at once.
      editor.focus()
    }
    // else this.focusOnHotkeys()

    // editor.addAction({
    //   id: 'execute-challenge',
    //   label: 'Run tests',
    //   keybindings: [
    //     /* eslint-disable no-bitwise */
    //     monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter),
    //   ],
    //   run: this.props.executeChallenge,
    // })
    editor.addAction({
      id: 'leave-editor',
      label: 'Leave editor',
      keybindings: [monaco.KeyCode.Escape],
      run: () => {
        // this.focusOnHotkeys()
        this.props.setEditorFocusability(false)
      },
    })
    editor.addAction({
      id: 'save-editor-content',
      label: 'Save editor content to localStorage',
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S),
      ],
      run: this.props.saveEditorContent,
    })
    editor.addAction({
      id: 'toggle-accessibility',
      label: 'Toggle Accessibility Mode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F1],
      run: () => {
        if (!this.props.setAccessibilityMode) {
          return false
        }

        const currentAccessibility = this.props.inAccessibilityMode
        // The store needs to be updated first, as onDidChangeConfiguration is
        // called before updateOptions returns
        this.props.setAccessibilityMode(!currentAccessibility)
        editor.updateOptions({
          accessibilitySupport: currentAccessibility ? 'auto' : 'on',
        })
      },
    })
    editor.onDidFocusEditorWidget(() => this.props.setEditorFocusability(true))
    // This is to persist changes caused by the accessibility tooltip.
    editor.onDidChangeConfiguration((event: any) => {
      if (!this.props.setAccessibilityMode) {
        return false
      }

      if (
        event.hasChanged(monaco.editor.EditorOption.accessibilitySupport) &&
        editor.getRawOptions().accessibilitySupport === 'on' &&
        !this.props.inAccessibilityMode
      ) {
        this.props.setAccessibilityMode(true)
      }
    })

    // @ts-ignore
    const editableBoundaries =
      challengeFiles &&
      fileKey &&
      // @ts-ignore
      challengeFiles[fileKey]?.editableRegionBoundaries
        ? // @ts-ignore
          [...challengeFiles[fileKey].editableRegionBoundaries]
        : []

    if (editableBoundaries.length === 2) {
      // TODO: is there a nicer approach/way of organising everything that
      // avoids the binds? babel-plugin-transform-class-properties ?
      const getViewZoneTop = this.getViewZoneTop.bind(this)
      const createDescription = this.createDescription.bind(this)
      const getOutputZoneTop = this.getOutputZoneTop.bind(this)
      const createOutputNode = this.createOutputNode.bind(this)

      const createWidget = (
        id: string,
        domNode: HTMLElement,
        getTop: Function
      ) => {
        const getId = () => id
        const getDomNode = () => domNode
        const getPosition = () => {
          domNode.style.width = editor.getLayoutInfo().contentWidth + 'px'
          domNode.style.top = getTop()

          // must return null, so that Monaco knows the widget will position
          // itself.
          return null
        }
        return {
          getId,
          getDomNode,
          getPosition,
        }
      }

      this._domNode = createDescription()

      this._outputNode = createOutputNode()

      this._overlayWidget = createWidget(
        'my.overlay.widget',
        this._domNode,
        getViewZoneTop
      )

      this._outputWidget = createWidget(
        'my.output.widget',
        this._outputNode,
        getOutputZoneTop
      )

      this._editor?.addOverlayWidget(this._overlayWidget)
      // TODO: order of insertion into the DOM probably matters, revisit once
      // the tabs have been fixed!
      this._editor?.addOverlayWidget(this._outputWidget)
      // TODO: if we keep using a single editor and switching content (rather
      // than having multiple open editors), this view zone needs to be
      // preserved when the tab changes.

      editor.changeViewZones(this.viewZoneCallback)
      editor.changeViewZones(this.outputZoneCallback)

      editor.onDidScrollChange(() => {
        editor.layoutOverlayWidget(this._overlayWidget)
        editor.layoutOverlayWidget(this._outputWidget)
      })
      this.showEditableRegion(editableBoundaries)
    }
  }

  showEditableRegion(editableBoundaries: Array<number>) {
    if (editableBoundaries.length !== 2) return
    // TODO: The heuristic has been commented out for now because the cursor
    // position is not saved at the moment, so it's redundant. I'm leaving it
    // here for now, in case we decide to save it in future.
    // this is a heuristic: if the cursor is at the start of the page, chances
    // are the user has not edited yet. If so, move to the start of the editable
    // region.
    // if (
    //  isEqual({ ...this._editor.getPosition() }, { lineNumber: 1, column: 1 })
    // ) {
    this._editor.setPosition({
      lineNumber: editableBoundaries[0] + 1,
      column: 1,
    })
    this._editor.revealLinesInCenter(...editableBoundaries)
    // }
  }

  // NOTE: this is where the view zone *should* be, not necessarily were it
  // currently is. (see getLineAfterViewZone)
  // TODO: DRY this and getOutputZoneTop out.
  getViewZoneTop() {
    const heightDelta = this.data.viewZoneHeight || 0

    const top =
      this._editor.getTopForLineNumber(this.getLineAfterViewZone()) -
      heightDelta -
      this._editor.getScrollTop() +
      'px'

    return top
  }

  // It's not possible to directly access the current view zone so we track
  // the region it should cover instead.
  // TODO: DRY
  getLineAfterViewZone() {
    // TODO: abstract away the data, ids etc.
    const range = this.data.model.getDecorationRange(this.data.startEditDecId)
    // if the first decoration is missing, this implies the region reaches the
    // start of the editor.
    return range ? range.endLineNumber + 1 : 1
  }

  getLineAfterEditableRegion() {
    // TODO: handle the case that the editable region reaches the bottom of the
    // editor
    return this.data.model.getDecorationRange(this.data.endEditDecId)
      .startLineNumber
  }

  getOutputZoneTop() {
    const heightDelta = this.data.outputZoneHeight || 0

    const top =
      this._editor.getTopForLineNumber(this.getLineAfterEditableRegion()) -
      heightDelta -
      this._editor.getScrollTop() +
      'px'

    return top
  }

  viewZoneCallback = (changeAccessor: any) => {
    // TODO: is there any point creating this here? I know it's cached, but
    // would it not be better just sourced from the overlayWidget?
    const domNode = this.createDescription()

    // make sure the overlayWidget has resized before using it to set the height
    domNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px'

    // TODO: set via onComputedHeight?
    this.data.viewZoneHeight = domNode.offsetHeight

    const background = document.createElement('div')
    background.style.background = 'lightgreen'

    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the overlayWidget (i.e. trigger it via onComputedHeight). If
    // not the editor may report the wrong value for position of the lines.
    const viewZone = {
      afterLineNumber: this.getLineAfterViewZone() - 1,
      heightInPx: domNode.offsetHeight,
      domNode: background,
      onComputedHeight: () =>
        this._editor.layoutOverlayWidget(this._overlayWidget),
    }

    this.data.viewZoneId = changeAccessor.addZone(viewZone)
  }

  // TODO: this is basically the same as viewZoneCallback, so DRY them out.
  outputZoneCallback = (changeAccessor: any) => {
    // TODO: is there any point creating this here? I know it's cached, but
    // would it not be better just sourced from the overlayWidget?
    const outputNode = this.createOutputNode()

    // make sure the overlayWidget has resized before using it to set the height
    outputNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px'

    // TODO: set via onComputedHeight?
    this.data.outputZoneHeight = outputNode.offsetHeight

    const background = document.createElement('div')
    background.style.background = 'lightpink'

    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the overlayWidget (i.e. trigger it via onComputedHeight). If
    // not the editor may report the wrong value for position of the lines.
    const viewZone = {
      afterLineNumber: this.getLineAfterEditableRegion() - 1,
      heightInPx: outputNode.offsetHeight,
      domNode: background,
      onComputedHeight: () =>
        this._editor.layoutOverlayWidget(this._outputWidget),
    }

    this.data.outputZoneId = changeAccessor.addZone(viewZone)
  }

  createDescription() {
    if (this._domNode) return this._domNode
    const { description = '' } = this.props
    const domNode = document.createElement('div')
    const desc = document.createElement('div')
    // const button = document.createElement('button')
    // button.innerHTML = 'Run the Tests (Ctrl + Enter)'
    // button.onclick = () => {
    //   const { executeChallenge } = this.props
    //   executeChallenge()
    // }

    domNode.appendChild(desc)
    // domNode.appendChild(button)
    desc.innerHTML = description

    desc.style.background = 'white'
    domNode.style.background = 'lightgreen'
    // TODO: the solution is probably just to use an overlay that's forced to
    // follow the decorations.
    // TODO: this is enough for Firefox, but Chrome needs more before the
    // user can select text by clicking and dragging.
    domNode.style.userSelect = 'text'
    // The z-index needs increasing as ViewZones default to below the lines.
    domNode.style.zIndex = '10'

    domNode.setAttribute('aria-hidden', 'true')

    domNode.style.background = 'lightYellow'
    domNode.style.left = this._editor.getLayoutInfo().contentLeft + 'px'
    domNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px'
    domNode.style.top = this.getViewZoneTop()
    this._domNode = domNode
    return domNode
  }

  createOutputNode() {
    if (this._outputNode) return this._outputNode
    const outputNode = document.createElement('div')
    const statusNode = document.createElement('div')
    const hintNode = document.createElement('div')
    outputNode.appendChild(statusNode)
    outputNode.appendChild(hintNode)
    hintNode.setAttribute('id', 'test-output')
    statusNode.setAttribute('id', 'test-status')
    statusNode.innerHTML = '// tests'

    // TODO: does it?
    // The z-index needs increasing as ViewZones default to below the lines.
    outputNode.style.zIndex = '10'

    outputNode.setAttribute('aria-hidden', 'true')
    outputNode.style.left = this._editor.getLayoutInfo().contentLeft + 'px'
    outputNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px'
    outputNode.style.top = this.getOutputZoneTop()

    this._outputNode = outputNode

    return outputNode
  }

  // focusOnHotkeys() {
  //   if (this.props.containerRef.current) {
  //     this.props.containerRef.current.focus()
  //   }
  // }

  focusOnEditor() {
    this._editor.focus()
  }

  onChange = (editorValue: any) => {
    const { updateFile, fileKey } = this.props
    updateFile({ key: fileKey, editorValue })
  }

  componentDidUpdate(prevProps: P) {
    if (this.props.dimensions !== prevProps.dimensions && this._editor) {
      this._editor.layout()
    }
  }

  render() {
    const { window } = global

    if (!window) {
      return null
    }

    // const MonacoEditor = require('react-monaco-editor').default;

    const { contents, ext, theme, fileKey } = this.props
    const editorTheme = theme === 'night' ? 'vs-dark-custom' : 'vs-custom'

    const language = modeMap[ext]

    return (
      <Suspense fallback={<Loader timeout={600} />}>
        <MonacoEditor
          editorDidMount={this.editorDidMount}
          editorWillMount={this.editorWillMount}
          key={`${editorTheme}-${fileKey}`}
          language={language}
          onChange={this.onChange}
          options={this.options}
          theme={editorTheme}
          value={contents}
        />
      </Suspense>
    )
  }
}

export default FccEditor
