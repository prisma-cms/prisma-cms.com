import PrismaCmsComponent from '@prisma-cms/component'
import Typography from 'material-ui/Typography'
import withStyles from 'material-ui/styles/withStyles'
import { TaskStatusProps, locales } from './interfaces'

export const styles = {
  root: {},
  item: {
    cursor: 'pointer',
  },
  status: {
    color: '#333',
    padding: 2,
  },
  statusNew: {
    backgroundColor: '#aa8cb9',
  },
  statusAccepted: {
    backgroundColor: '#c7ecc5',
  },
  statusRejected: {
    backgroundColor: 'lightgray',
  },
  statusProgress: {
    backgroundColor: '#92f78c',
  },
  statusPaused: {
    backgroundColor: '#afecec',
  },
  statusDone: {
    backgroundColor: '#4dfb43',
  },
  statusDiscuss: {
    backgroundColor: '#f7c78c',
  },
  statusApproved: {
    backgroundColor: '#0bdc0b',
  },
  statusRevisionsRequired: {
    backgroundColor: '#8ccbf5',
  },
  statusCompleted: {
    backgroundColor: '#05c305',
  },
}

export class TaskStatus extends PrismaCmsComponent<TaskStatusProps> {
  // static propTypes = {
  //   // eslint-disable-next-line react/forbid-foreign-prop-types
  //   ...PrismaCmsComponent.propTypes,
  //   inEditMode: PropTypes.bool.isRequired,
  //   value: PropTypes.string,
  // };

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    inEditMode: false,
    locales,
  }

  render() {
    const { value, classes } = this.props

    if (!value) {
      return null
    }

    return (
      <Typography
        component="span"
        className={[classes.status, classes[`status${value}`]].join(' ')}
      >
        {this.lexicon(value)}
      </Typography>
    )
  }
}

// TODO: Оставил для обратной совместимости.
// После окончательного переноса удалить
export class TaskStatusItem extends TaskStatus {}

export default withStyles(styles)((props: TaskStatusProps) => (
  <TaskStatus {...props} />
))
