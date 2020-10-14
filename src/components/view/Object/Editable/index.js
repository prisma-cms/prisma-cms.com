import PropTypes from 'prop-types'

import EditableView from 'apollo-cms/lib/DataView/Object/Editable'

class EditableObject extends EditableView {
  static propTypes = {
    ...EditableView.propTypes,
    setPageMeta: PropTypes.func,
  }

  // static defaultProps = {
  //   ...EditableView.defaultProps,
  // }

  getTextField(props) {
    const inEditMode = this.isInEditMode()

    const { disabled } = props

    if (disabled === undefined && !inEditMode) {
      Object.assign(props, {
        disabled: true,
      })
    }

    return super.getTextField(props)
  }

  setPageMeta() {
    const {
      setPageMeta,
      data: { object },
    } = this.props

    if (setPageMeta) {
      setPageMeta(object)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.setPageMeta()

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState)
  }
}

export default EditableObject
