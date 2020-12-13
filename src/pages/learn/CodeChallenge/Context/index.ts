import React from 'react'

import { CodeChallengeFileExt } from 'src/pages/learn/CodeChallenge/View/Editor'

import { CodeChallenge_Fragment } from 'src/modules/gql/generated'

export interface CodeChallengeContext {
  challenge: CodeChallenge_Fragment
  challengeData: {
    challengeType: number | null | undefined
    file: {
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
  /**
   * Вывод технических сообщений при выполнении тестов
   */
  logger: {
    output: ReadonlyArray<React.ReactChild>
    addOutput: (item: React.ReactChild) => void
    setOutput: (output: Array<React.ReactChild>) => void
  }
}

export default React.createContext<CodeChallengeContext | null>(null)
