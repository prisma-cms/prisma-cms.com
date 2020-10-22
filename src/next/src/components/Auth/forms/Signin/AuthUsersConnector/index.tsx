import React, { useEffect, useState } from 'react'
import { AuthFormUsersConnectionQuery, useAuthFormUsersConnectionQuery } from 'src/modules/gql/generated'
import AuthUsers from '../AuthUsers'
import { AuthUsersConnectorProps } from './interfaces'

const AuthUsersConnector: React.FC<AuthUsersConnectorProps> = (props) => {
  const {
    View = AuthUsers,
    where,
    first,
    skip,
    orderBy,
    ...other
  } = props


  const data = useAuthFormUsersConnectionQuery({
    /**
     * Если условие не задано, не выполняем запрос.
     * При этом надо учитывать, что если условие задавалось и запрос выполнялся,
     * то после очищения условия объект результата все еще имеется.
     */
    skip: !where,

    variables: {
      where,
      first,
      skip,
      orderBy,
    },
    onCompleted: (data) => {
      setResponse(data);
    },

  });

  /**
   * Объект response нужен для того, чтобы смена списка пользователей выполнялась
   * плавно, так как useState - это синхронный метод, при каждом его выполнении у нас
   * сначала объект ответа {loading: true, data: null}.
   * По этой причине мы юзаем метод onCompleted, который вывызывается именно в момент завершения
   * выполнения запроса.
   */
  const [response, setResponse] = useState<AuthFormUsersConnectionQuery | null | undefined>(data.data);

  /**
   * Так как у нас запрос не выполняется, если where не передан,
   * то возникает ситуация, когда фильтр очистили, но данные все еще выводятся.
   * По этой причине выполняем сброс результата, если условия нет, а результат есть.
   */
  useEffect(() => {
    if (!where && response) {

      setResponse(null);
    }
  }, [response, where]);


  return <View
    response={response || null}
    first={first}
    {...other}
  />;
}

export default AuthUsersConnector
