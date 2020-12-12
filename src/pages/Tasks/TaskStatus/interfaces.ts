import { PrismaCmsComponentProps } from '@prisma-cms/component'

export const locales = {
  ru: {
    values: {
      Status: 'Статус',
      New: 'Новая',
      Accepted: 'Принята',
      Rejected: 'Отменена',
      Progress: 'Выполняется',
      Paused: 'Приостановлена',
      Done: 'Выполнена',
      Discuss: 'Обсуждается',
      Approved: 'Одобрена',
      RevisionsRequired: 'Требуется проверка',
      Completed: 'Завершена',
    },
  },
}

export type TaskStatusValue = keyof typeof locales['ru']['values']

export interface TaskStatusProps extends PrismaCmsComponentProps {
  classes?: any

  value: TaskStatusValue
}
