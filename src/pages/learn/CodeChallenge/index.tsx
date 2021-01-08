import Head from 'next/head'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  useCodeChallengeQuery,
  CodeChallengeDocument,
  CodeChallengeQuery,
  CodeChallengeQueryVariables,
  useCodeChallengeCompletionQuery,
  CodeChallengeCompletionQuery,
} from 'src/modules/gql/generated'

import { useRouter, NextRouter } from 'next/router'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import View from './View'

import Context, {
  ChallengeData,
  CodeChallengeContext,
  TestFile,
  TestResult,
} from './Context'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

import Button from 'material-ui/Button'
import PrismaContext, { PrismaCmsContext } from '@prisma-cms/context'

const getCodeChallengeVariables = (
  router: NextRouter | NextPageContextCustom
) => {
  const id =
    router.query.id && typeof router.query.id === 'string'
      ? router.query.id
      : null

  const variables: CodeChallengeQueryVariables = {
    where: {
      id,
    },
  }

  return variables
}

const CodeChallengePage: Page = () => {
  const prismaCmsContext = useContext(PrismaContext) as PrismaCmsContext
  const user = prismaCmsContext.user

  const router = useRouter()

  const variables = useMemo(() => {
    return getCodeChallengeVariables(router)
  }, [router])

  const response = useCodeChallengeQuery({
    skip: !variables.where.id,
    variables,
    onError: console.error,
  })

  const object = response.data?.codeChallenge

  const cacheKey =
    global.localStorage && object ? `lesson_${object.id}_file_content` : null

  // const codeChallengeCompletion = useMemo(() => {

  //   if (!object || !user) {
  //     return null;
  //   }

  //   return user.CodeChallengeCompletions?.find(
  //     (n) => n.CodeChallenge.id === object.id
  //   )

  // }, [object, user]);

  // const initialChallengeData = useMemo<ChallengeData>(
  //   () => (),
  //   [object?.challengeType]
  // )

  /**
   * Готовим файл, добавляя данные из сессии
   */
  const prepareFile = useCallback(
    (file) => {
      if (cacheKey) {
        const contents = global.localStorage?.getItem(cacheKey)

        if (contents !== null) {
          file = {
            ...file,
            contents,
          }
        }
      }

      return file
    },
    [cacheKey]
  )

  const [initialChallengeData] = useState<ChallengeData>(() => {
    const files: Array<Partial<TestFile>> =
      object?.files && Array.isArray(object.files) ? object?.files : []

    const { ...firstFile } = files[0] || {}

    const file: TestFile = {
      key: 'indexjs',
      head: '',
      tail: '',
      history: ['index.js'],
      name: 'index',
      ext: 'js',
      path: 'index.js',
      contents: ``,
      error: null,
      seed: '',
      cacheKey,
      ...firstFile,
    }

    return {
      challengeType: object?.challengeType,
      file,
    }
  })

  const [challengeData, setChallengeDataToState] = useState<ChallengeData>(
    () => {
      const file = initialChallengeData.file

      return {
        ...initialChallengeData,
        file: prepareFile(file),
      }
    }
  )

  /**
   * @writeCache Если да, то записываем в хранилище
   */
  const setChallengeData = useCallback(
    (value: ChallengeData, writeCache = true) => {
      if (cacheKey && writeCache) {
        if (value.file.contents) {
          global.localStorage?.setItem(cacheKey, value.file.contents)
        } else {
          global.localStorage?.removeItem(cacheKey)
        }
      }

      setChallengeDataToState(value)
    },
    [cacheKey]
  )

  const codeChallengeCompletionId = useMemo(() => {
    if (!object || !user) {
      return null
    }

    return user.CodeChallengeCompletions?.find(
      (n) => n.CodeChallenge.id === object.id
    )?.id
  }, [object, user])

  /**
   * Если пользовательское решение было загружено и нет кеша,
   * устанавливаем этот в качестве текущего
   */
  const codeChallengeCompletionQueryCompleted = useCallback(
    (data: CodeChallengeCompletionQuery) => {
      const cachedData = cacheKey
        ? global.localStorage?.getItem(cacheKey)
        : null

      if (cachedData !== null) {
        return
      }

      const content = data.codeChallengeCompletion?.content

      if (content) {
        const file = challengeData.file

        setChallengeData(
          {
            ...challengeData,
            file: {
              ...file,
              contents: content,
            },
          },
          false
        )
      }
    },
    [cacheKey, challengeData, setChallengeData]
  )

  const codeChallengeCompletion = useCodeChallengeCompletionQuery({
    skip: !codeChallengeCompletionId,
    variables: {
      where: {
        id: codeChallengeCompletionId,
      },
    },
    onCompleted: codeChallengeCompletionQueryCompleted,
  }).data?.codeChallengeCompletion

  const [output, setOutput] = useState<ReadonlyArray<React.ReactChild>>([
    `/**
    * Your test output will go here.
    */`,
  ])

  const addOutput = useCallback(
    (item: React.ReactChild) => {
      const newOutput = [...output]

      newOutput.push(item)

      setOutput(newOutput)
    },
    [output]
  )

  const [testsResults, setTestResults] = useState<TestResult[]>([])

  /**
   * Восстанавливаем код и сбрасываем результаты тестов
   */
  const resetChallengeData = useCallback(() => {
    setChallengeData(initialChallengeData)
    setTestResults([])
  }, [initialChallengeData, setChallengeData])

  const context = useMemo<CodeChallengeContext | null>(() => {
    if (!object || !object.id) {
      return null
    }

    // const { challengeType } = object

    const context: CodeChallengeContext = {
      challenge: object,
      challengeData,
      logger: {
        output,
        setOutput,
        addOutput,
      },
      testsResults,
      setTestResults,
      // contents,
      // setContents,
      setChallengeData,
      resetChallengeData,
      // taskStatus: Task?.status,
      codeChallengeCompletion,
      user,
    }

    return context
  }, [
    addOutput,
    challengeData,
    codeChallengeCompletion,
    object,
    output,
    resetChallengeData,
    setChallengeData,
    testsResults,
    user,
  ])

  const [showSuccessModal, setShowSuccessModal] = useState<
    boolean | undefined
  >()

  useEffect(() => {
    /**
     * Если флаг успешности не был еще задан и есть результаты тестов и все успешные,
     * то выводим диалог
     */
    if (
      showSuccessModal === undefined &&
      testsResults.length &&
      !testsResults.find((n) => n.pass !== true)
    ) {
      setShowSuccessModal(true)
    } else if (showSuccessModal !== undefined && !testsResults.length) {
      /**
       * Если успешно было выполнено, но сброшены результаты, то сбрасываем результаты
       */
      setShowSuccessModal(undefined)
    }
  }, [showSuccessModal, testsResults])

  const closeDialog = useCallback(() => {
    setShowSuccessModal(false)
  }, [])

  const successModal = useMemo(() => {
    if (showSuccessModal === undefined) {
      return null
    }

    return (
      <Dialog
        open={showSuccessModal}
        onClose={closeDialog}
        role="CodeChallengeSuccess"
      >
        <DialogTitle>Поздравляю!</DialogTitle>
        <DialogContent>
          <DialogContentText role="message">
            Задание успешно выполнено!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" role="close">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }, [closeDialog, showSuccessModal])

  if (!object) {
    return null
  }

  // console.log('CodeChallengePage object', object);
  // console.log('CodeChallengePage context', context);

  return (
    <>
      <Head>
        <title>Задание "{object.name}".</title>
        <meta name="description" content={object.name || ''} />
      </Head>

      <Context.Provider value={context}>
        <View
          object={object}
          codeChallengeCompletion={context?.codeChallengeCompletion}
        />
      </Context.Provider>

      {successModal}
    </>
  )
}

CodeChallengePage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const variables = getCodeChallengeVariables(context)

  const result = variables.where.id
    ? await apolloClient.query<CodeChallengeQuery>({
        query: CodeChallengeDocument,

        /**
         * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
         * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
         */
        variables,
      })
    : null

  return {
    statusCode: !result?.data.codeChallenge ? 404 : undefined,
    layout: {
      variant: 'fullwidth',
    },
  }
}

export default CodeChallengePage
