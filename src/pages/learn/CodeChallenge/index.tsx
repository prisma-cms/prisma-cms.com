import Head from 'next/head'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useCodeChallengeQuery,
  CodeChallengeDocument,
  CodeChallengeQuery,
  CodeChallengeQueryVariables,
} from 'src/modules/gql/generated'

import { useRouter, NextRouter } from 'next/router'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import View from './View'

import Context, {
  ChallengeData,
  CodeChallengeContext,
  TestResult,
} from './Context'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

import Button from 'material-ui/Button'

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

  // const initialChallengeData = useMemo<ChallengeData>(
  //   () => (),
  //   [object?.challengeType]
  // )

  const [challengeData, setChallengeData] = useState<ChallengeData>(() => {
    const files = object?.files ?? []

    // return {
    //   challengeType: object?.challengeType,
    //   file: {
    //     key: 'indexjs',
    //     head: '',
    //     tail: '',
    //     history: ['index.js'],
    //     name: 'index',
    //     ext: 'js',
    //     path: 'index.js',
    //     contents: ``,
    //     error: null,
    //     seed: '',
    //   },
    // };

    const { ...file } = files[0] || {}

    return {
      challengeType: object?.challengeType,
      file: {
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
        ...file,
      },
    }
  })

  const [initialChallengeData] = useState(challengeData)

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
  }, [initialChallengeData])

  const context = useMemo<CodeChallengeContext | null>(() => {
    if (!object) {
      return null
    }
    // console.log('object', object);

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
    }

    return context
  }, [
    addOutput,
    challengeData,
    object,
    output,
    resetChallengeData,
    testsResults,
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
        <View object={object} />
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
