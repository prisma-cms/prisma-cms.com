import React, { useCallback } from 'react'

import IconButton from 'material-ui/IconButton'
import StopIcon from 'material-ui-icons/Stop'

import { MainMenuTimerProps } from './interfaces'
import { useUpdateTimerProcessorMutation } from 'src/modules/gql/generated'

// import Context, { PrismaCmsContext } from '@prisma-cms/context';

const MainMenuTimer: React.FC<MainMenuTimerProps> = ({ className, timer }) => {
  // const context = useContext(Context) as PrismaCmsContext;

  const { Task, stopedAt } = timer

  const { name, TaskProjects } = Task

  const Project =
    TaskProjects && TaskProjects.length ? TaskProjects[0].Project : null

  const projectName = Project?.name

  const [stopTimerMutation, { loading }] = useUpdateTimerProcessorMutation()

  // console.log('loading', loading);
  // console.log('timer', { ...timer });

  // const [inRequest, setInRequest] = useState(false);

  const stopTimer = useCallback(async () => {
    // setInRequest(true);

    const result = await stopTimerMutation({
      variables: {
        data: {
          stopedAt: new Date(),
        },
        where: {
          id: timer.id,
        },
      },
    })

    if (!result.data?.response.success) {
      alert(result.data?.response.message || 'Ошибка выполнения запроса')
    }
    // else {
    //   context.apiClientResetStore();
    // }

    // setInRequest(false);
  }, [stopTimerMutation, timer.id])

  return !stopedAt ? (
    <IconButton
      className={className}
      title={`${projectName ? `${projectName}. ` : ''}${name}`}
      onClick={stopTimer}
      disabled={loading}
    >
      <StopIcon />
    </IconButton>
  ) : null
}

export default MainMenuTimer
