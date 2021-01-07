/* eslint-disable react/no-string-refs */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { Component, HTMLAttributes } from 'react'
import { findDOMNode } from 'react-dom'
import scrollIntoView from 'dom-scroll-into-view'
import {
  AutocompleteItem,
  ReactAutocompleteProps,
  ReactAutocompleteState,
} from './interfaces'

const IMPERATIVE_API = [
  'blur',
  'checkValidity',
  'click',
  'focus',
  'select',
  'setCustomValidity',
  'setSelectionRange',
  'setRangeText',
]

function getScrollOffset() {
  return {
    x:
      window.pageXOffset !== undefined
        ? window.pageXOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollLeft,
    y:
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop,
  }
}

class ReactAutocomplete<
  P extends ReactAutocompleteProps = ReactAutocompleteProps,
  S extends ReactAutocompleteState = ReactAutocompleteState
> extends Component<P, S> {
  static defaultProps = {
    value: '',
    wrapperProps: {},
    wrapperStyle: {
      display: 'inline-block',
    },
    inputProps: {},
    renderInput(props: any) {
      return <input {...props} />
    },
    onChange() {
      return
    },
    onSelect() {
      return
    },
    isItemSelectable() {
      return true
    },
    renderMenu(
      items: React.ReactChild,
      _value: string,
      style?: HTMLAttributes<HTMLDivElement>
    ) {
      return <div style={{ ...style, ...this.menuStyle }}>{items}</div>
    },
    menuStyle: {
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 0',
      fontSize: '90%',
      position: 'fixed',
      overflow: 'auto',
      maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
    } as HTMLAttributes<HTMLDivElement>,
    autoHighlight: true,
    selectOnBlur: false,
    onMenuVisibilityChange() {
      return
    },
    renderDebug: function (debugStates: any[]) {
      return (
        <pre style={{ marginLeft: 300 }}>
          {JSON.stringify(
            debugStates.slice(
              Math.max(0, debugStates.length - 5),
              debugStates.length
            ),
            null,
            2
          )}
        </pre>
      )
    },
  }

  _debugStates: any[] = []

  constructor(props: P) {
    super(props)

    this.state = {
      ...this.state,
      isOpen: false,
      highlightedIndex: null,
    }

    // this._debugStates = []
    this.ensureHighlightedIndex = this.ensureHighlightedIndex.bind(this)
    this.exposeAPI = this.exposeAPI.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleInputClick = this.handleInputClick.bind(this)
    this.maybeAutoCompleteText = this.maybeAutoCompleteText.bind(this)
  }

  _ignoreBlur = false
  _ignoreFocus = false
  _scrollOffset: ReturnType<typeof getScrollOffset> | null = null
  _scrollTimer: NodeJS.Timeout | null = null

  UNSAFE_componentWillMount() {
    // this.refs is frozen, so we need to assign a new object to it
    this.refs = {}
    // this._ignoreBlur = false
    // this._ignoreFocus = false
    // this._scrollOffset = null
    // this._scrollTimer = null
  }

  componentWillUnmount() {
    this._scrollTimer && clearTimeout(this._scrollTimer)
    this._scrollTimer = null
  }

  UNSAFE_componentWillReceiveProps(nextProps: P) {
    if (this.state.highlightedIndex !== null) {
      this.setState(this.ensureHighlightedIndex)
    }
    if (
      nextProps.autoHighlight &&
      (this.props.value !== nextProps.value ||
        this.state.highlightedIndex === null)
    ) {
      this.setState(this.maybeAutoCompleteText)
    }
  }

  componentDidMount() {
    if (this.isOpen()) {
      this.setMenuPositions()
    }
  }

  componentDidUpdate(prevProps: P, prevState: S) {
    if (
      (this.state.isOpen && !prevState.isOpen) ||
      ('open' in this.props && this.props.open && !prevProps.open)
    )
      this.setMenuPositions()

    this.maybeScrollItemIntoView()
    if (prevState.isOpen !== this.state.isOpen) {
      this.props.onMenuVisibilityChange &&
        this.props.onMenuVisibilityChange(this.state.isOpen)
    }
  }

  exposeAPI(el: HTMLInputElement) {
    this.refs.input = el
    // @ts-ignore
    IMPERATIVE_API.forEach((ev) => (this[ev] = el && el[ev] && el[ev].bind(el)))
  }

  maybeScrollItemIntoView() {
    if (this.isOpen() && this.state.highlightedIndex !== null) {
      const itemNode = this.refs[`item-${this.state.highlightedIndex}`]
      const menuNode = this.refs.menu
      // eslint-disable-next-line react/no-find-dom-node
      scrollIntoView(findDOMNode(itemNode), findDOMNode(menuNode), {
        onlyScrollIfNeeded: true,
      })
    }
  }

  handleKeyDown(event: React.KeyboardEvent) {
    if (ReactAutocomplete.keyDownHandlers[event.key]) {
      ReactAutocomplete.keyDownHandlers[event.key].call(this, event)
    } else if (!this.isOpen()) {
      this.setState({
        isOpen: true,
      })
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange && this.props.onChange(event, event.target.value)
  }

  static keyDownHandlers: Record<
    KeyboardEvent['key'],
    (this: ReactAutocomplete, event: React.KeyboardEvent) => void
  > = {
    ArrowDown(event) {
      event.preventDefault()
      const items = this.getFilteredItems(this.props)
      if (!items.length) return
      const { highlightedIndex } = this.state
      let index = highlightedIndex === null ? -1 : highlightedIndex
      for (let i = 0; i < items.length; i++) {
        const p = (index + i + 1) % items.length
        if (
          this.props.isItemSelectable &&
          this.props.isItemSelectable(items[p])
        ) {
          index = p
          break
        }
      }
      if (index > -1 && index !== highlightedIndex) {
        this.setState({
          highlightedIndex: index,
          isOpen: true,
        })
      }
    },

    ArrowUp(event) {
      event.preventDefault()
      const items = this.getFilteredItems(this.props)
      if (!items.length) return
      const { highlightedIndex } = this.state
      let index = highlightedIndex === null ? items.length : highlightedIndex
      for (let i = 0; i < items.length; i++) {
        const p = (index - (1 + i) + items.length) % items.length
        if (
          this.props.isItemSelectable &&
          this.props.isItemSelectable(items[p])
        ) {
          index = p
          break
        }
      }
      if (index !== items.length) {
        this.setState({
          highlightedIndex: index,
          isOpen: true,
        })
      }
    },

    Enter(event) {
      // Key code 229 is used for selecting items from character selectors (Pinyin, Kana, etc)
      if (event.keyCode !== 13) return
      // In case the user is currently hovering over the menu
      this.setIgnoreBlur(false)
      if (!this.isOpen()) {
        // menu is closed so there is no selection to accept -> do nothing
        return
      } else if (this.state.highlightedIndex == null) {
        // input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
        this.setState(
          {
            isOpen: false,
          },
          () => {
            this.refs.input instanceof HTMLInputElement &&
              this.refs.input.select()
          }
        )
      } else {
        // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
        event.preventDefault()
        const item = this.getFilteredItems(this.props)[
          this.state.highlightedIndex
        ]
        const value = this.props.getItemValue(item)
        this.setState(
          {
            isOpen: false,
            highlightedIndex: null,
          },
          () => {
            if (this.refs.input instanceof HTMLInputElement) {
              //this.refs.input.focus() // TODO: file issue
              this.refs.input.setSelectionRange(value.length, value.length)
              this.props.onSelect(value, item)
            }
          }
        )
      }
    },

    Escape() {
      // In case the user is currently hovering over the menu
      this.setIgnoreBlur(false)
      this.setState({
        highlightedIndex: null,
        isOpen: false,
      })
    },

    Tab() {
      // In case the user is currently hovering over the menu
      this.setIgnoreBlur(false)
    },
  }

  getFilteredItems(props: P) {
    let items = props.items

    if (props.shouldItemRender) {
      items = items.filter(
        (item) =>
          props.shouldItemRender && props.shouldItemRender(item, props.value)
      )
    }

    if (props.sortItems) {
      items.sort(
        (a, b) => props.sortItems && props.sortItems(a, b, props.value)
      )
    }

    return items
  }

  maybeAutoCompleteText(state: S, props: P) {
    const { highlightedIndex } = state
    const { value, getItemValue } = props
    let index = highlightedIndex === null ? 0 : highlightedIndex
    const items = this.getFilteredItems(props)
    for (let i = 0; i < items.length; i++) {
      if (props.isItemSelectable && props.isItemSelectable(items[index])) {
        break
      }
      index = (index + 1) % items.length
    }
    const matchedItem =
      items[index] &&
      props.isItemSelectable &&
      props.isItemSelectable(items[index])
        ? items[index]
        : null
    if (value !== '' && matchedItem) {
      const itemValue = getItemValue(matchedItem) || ''
      const itemValueDoesMatch =
        itemValue.toLowerCase().indexOf(value.toLowerCase()) === 0
      if (itemValueDoesMatch) {
        return { highlightedIndex: index }
      }
    }
    return { highlightedIndex: null }
  }

  ensureHighlightedIndex(
    state: S,
    props: P
  ): { highlightedIndex: S['highlightedIndex'] } | null {
    if (
      state.highlightedIndex !== null &&
      state.highlightedIndex >= this.getFilteredItems(props).length
    ) {
      return { highlightedIndex: null }
    } else {
      return null
    }
  }

  setMenuPositions() {
    const node = this.refs.input
    if (!node || !(node instanceof HTMLInputElement)) {
      return
    }
    const rect = node.getBoundingClientRect()
    const computedStyle = global.window.getComputedStyle(node)
    const marginBottom = parseInt(computedStyle.marginBottom, 10) || 0
    const marginLeft = parseInt(computedStyle.marginLeft, 10) || 0
    const marginRight = parseInt(computedStyle.marginRight, 10) || 0
    this.setState({
      menuTop: rect.bottom + marginBottom,
      menuLeft: rect.left + marginLeft,
      menuWidth: rect.width + marginLeft + marginRight,
    })
  }

  highlightItemFromMouse(index: number) {
    this.setState({ highlightedIndex: index })
  }

  selectItemFromMouse(item: AutocompleteItem) {
    const value = this.props.getItemValue(item)
    // The menu will de-render before a mouseLeave event
    // happens. Clear the flag to release control over focus
    this.setIgnoreBlur(false)
    this.setState(
      {
        isOpen: false,
        highlightedIndex: null,
      },
      () => {
        this.props.onSelect(value, item)
      }
    )
  }

  setIgnoreBlur(ignore: boolean) {
    this._ignoreBlur = ignore
  }

  renderMenu() {
    const items = this.getFilteredItems(this.props).map((item, index) => {
      const element = this.props.renderItem(
        item,
        this.state.highlightedIndex === index,
        { cursor: 'default' }
      )
      return React.cloneElement(element, {
        onMouseEnter:
          this.props.isItemSelectable && this.props.isItemSelectable(item)
            ? () => this.highlightItemFromMouse(index)
            : null,
        onClick:
          this.props.isItemSelectable && this.props.isItemSelectable(item)
            ? () => this.selectItemFromMouse(item)
            : null,
        ref: (e: React.ReactInstance | Element) =>
          (this.refs[`item-${index}`] = e),
      })
    })
    const style = {
      left: this.state.menuLeft,
      top: this.state.menuTop,
      minWidth: this.state.menuWidth,
    }
    const menu = this.props.renderMenu
      ? this.props.renderMenu(items, this.props.value, style)
      : null
    return menu
      ? React.cloneElement(menu, {
          ref: (e: React.ReactInstance | Element) => (this.refs.menu = e),
          // Ignore blur to prevent menu from de-rendering before we can process click
          onTouchStart: () => this.setIgnoreBlur(true),
          onMouseEnter: () => this.setIgnoreBlur(true),
          onMouseLeave: () => this.setIgnoreBlur(false),
        })
      : null
  }

  handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (this._ignoreBlur) {
      this._ignoreFocus = true
      this._scrollOffset = getScrollOffset()
      this.refs.input instanceof HTMLInputElement && this.refs.input.focus()
      return
    }
    let setStateCallback
    const highlightedIndex = this.state.highlightedIndex ?? null
    if (this.props.selectOnBlur) {
      const items = this.getFilteredItems(this.props)
      const item = highlightedIndex !== null ? items[highlightedIndex] : null
      const value = this.props.getItemValue(item)
      setStateCallback = () => this.props.onSelect(value, item)
    }
    this.setState(
      {
        isOpen: false,
        highlightedIndex: null,
      },
      setStateCallback
    )
    const onBlur = this.props.inputProps?.onBlur
    if (onBlur) {
      onBlur(event)
    }
  }

  handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (this._ignoreFocus && this._scrollOffset) {
      this._ignoreFocus = false
      const { x, y } = this._scrollOffset
      this._scrollOffset = null
      // Focus will cause the browser to scroll the <input> into view.
      // This can cause the mouse coords to change, which in turn
      // could cause a new highlight to happen, cancelling the click
      // event (when selecting with the mouse)
      window.scrollTo(x, y)
      // Some browsers wait until all focus event handlers have been
      // processed before scrolling the <input> into view, so let's
      // scroll again on the next tick to ensure we're back to where
      // the user was before focus was lost. We could do the deferred
      // scroll only, but that causes a jarring split second jump in
      // some browsers that scroll before the focus event handlers
      // are triggered.
      this._scrollTimer && clearTimeout(this._scrollTimer)
      this._scrollTimer = setTimeout(() => {
        this._scrollTimer = null
        window.scrollTo(x, y)
      }, 0)
      return
    }
    this.setState({ isOpen: true })
    const onFocus = this.props.inputProps?.onFocus
    if (onFocus) {
      onFocus(event)
    }
  }

  isInputFocused() {
    const el = this.refs.input
    return (
      el instanceof HTMLElement &&
      el.ownerDocument &&
      el === el.ownerDocument.activeElement
    )
  }

  handleInputClick() {
    // Input will not be focused if it's disabled
    if (this.isInputFocused() && !this.isOpen()) this.setState({ isOpen: true })
  }

  composeEventHandlers(internal: Function, external?: Function) {
    return external
      ? (e: React.KeyboardEvent | React.MouseEvent) => {
          internal(e)
          external(e)
        }
      : internal
  }

  isOpen() {
    return 'open' in this.props ? this.props.open : this.state.isOpen
  }

  render() {
    if (this.props.debug) {
      // you don't like it, you love it
      this._debugStates.push({
        id: this._debugStates.length,
        state: this.state,
      })
    }

    const { inputProps, renderDebug } = this.props
    const open = this.isOpen()
    return (
      <div style={{ ...this.props.wrapperStyle }} {...this.props.wrapperProps}>
        {this.props.renderInput
          ? this.props.renderInput({
              ...inputProps,
              role: 'combobox',
              'aria-autocomplete': 'list',
              'aria-expanded': open,
              autoComplete: 'off',
              ref: this.exposeAPI,
              onFocus: this.handleInputFocus,
              onBlur: this.handleInputBlur,
              onChange: this.handleChange,
              onKeyDown: this.composeEventHandlers(
                this.handleKeyDown,
                inputProps?.onKeyDown
              ),
              onClick: this.composeEventHandlers(
                this.handleInputClick,
                inputProps?.onClick
              ),
              value: this.props.value,
            })
          : null}
        {open && this.renderMenu()}
        {this.props.debug && renderDebug
          ? renderDebug(this._debugStates)
          : null}
      </div>
    )
  }
}

export default ReactAutocomplete
