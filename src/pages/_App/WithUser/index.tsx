import React, { useMemo } from 'react'

import Context, { PrismaCmsContext } from '@prisma-cms/context'

import { useMeQuery } from 'src/modules/gql/generated'

import Header from 'src/components/MainMenu'
import { WithUserProps } from './interfaces'
import SubscriptionProvider from './SubscriptionProvider'

const WithUser: React.FC<WithUserProps> = ({ children, context }) => {
  const { client } = context

  // TODO Надо проработать перезапрос пользователя.
  /**
   * Дело в том, что сейчас у нас не передаются параметры в запрос
   * и по этой причине даже при изменении токена в глобальном сторе
   * у нас не выполняется новый запрос на сервер.
   * Сейчас это у нас решается сбросом всего хранилища аполло-клиента при авторизации.
   * Надо будет подумать стоил ли перевести на useCallback и fetchPolicy: network-only
   */
  const { data } = useMeQuery({
    // skip: !token,
    // onCompleted: (data) => {
    //   /**
    //    * Здесь у нас не срабатывает при авторизации, так как данные обновляются
    //    * через client.resetStore(). Там данные запрашиваются прямым запросом
    //    * и вливаются в кеш. Здесь после этого выполнение происходит без
    //    * запроса на сервер, так как данные из кеша берутся, соответственно и этот
    //    * метод не выполняется.
    //    */
    // },
  })

  const user = data?.user

  const header = useMemo(() => <Header user={user} />, [user])

  /**
   * Контекст обновляем только в случае если объект пользователя изменился.
   * Иначе у нас будет постоянно передаваться обновленный контекст и все
   * компоненты будут ререндериться.
   */
  const contextWithUser = useMemo(() => {
    if (context.user !== user) {
      const newContext: PrismaCmsContext = {
        ...context,
        user,
      }

      return newContext
    }

    // else
    return context
  }, [context, user])

  return (
    <Context.Provider value={contextWithUser}>
      {/* 
    TODO добавить подписку на объект пользователя
  */}
      <SubscriptionProvider user={user} client={client}>
        {header}

        {children}
      </SubscriptionProvider>
    </Context.Provider>
  )
}

export default WithUser
