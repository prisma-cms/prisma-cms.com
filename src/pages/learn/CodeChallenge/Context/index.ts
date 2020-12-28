import React from 'react'

import { CodeChallengeFileExt } from 'src/pages/learn/CodeChallenge/View/Editor'

import { CodeChallenge_Fragment } from 'src/modules/gql/generated'

export type TestError = {
  message: string
  stack: string
  code: string | undefined
  file: Record<string, any>
}

export type TestResult = {
  pass: boolean
  err?: TestError
}

export type TestFile = {
  source?: string
  contents: string
  error: string | null
  ext: CodeChallengeFileExt
  head: string
  history: string[]
  key: string
  name: string
  path: string
  seed: string
  tail: string
}

export type ChallengeData = {
  challengeType: number | null | undefined
  file: TestFile
  // files: {
  //   [x: string]: {
  //     contents: string
  //     error: string | null
  //     ext: CodeChallengeFileExt
  //     head: string
  //     history: string[]
  //     key: string
  //     name: string
  //     path: string
  //     seed: string
  //     tail: string
  //   }
  // }
}

export interface CodeChallengeContext {
  challenge: CodeChallenge_Fragment
  challengeData: ChallengeData
  setChallengeData: React.Dispatch<React.SetStateAction<ChallengeData>>
  resetChallengeData: () => void
  /**
   * Вывод технических сообщений при выполнении тестов
   */
  logger: {
    output: ReadonlyArray<React.ReactChild>
    addOutput: (item: React.ReactChild) => void
    setOutput: (output: Array<React.ReactChild>) => void
  }
  /**
   * Результаты тестов
   */
  testsResults: TestResult[]
  setTestResults: React.Dispatch<React.SetStateAction<TestResult[]>>

  // contents: string;
  // setContents: React.Dispatch<React.SetStateAction<string>>
}

export default React.createContext<CodeChallengeContext | null>(null)
