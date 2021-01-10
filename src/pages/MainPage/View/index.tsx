import Typography from 'material-ui/Typography'
import React, { useMemo } from 'react'
import {
  MainPageCodeChallengeCompletionFragment,
  Resource_Fragment,
  UserNoNestingFragment,
} from 'src/modules/gql/generated'
import MainPageCodeChallengeCompletions from './CodeChallengeCompletions'
import MainPageComments from './Comments'
import { MainPageProps } from './interfaces'
import MainPageStudents from './Students'
import { MainPageViewStyled } from './styles'

const MainPageView: React.FC<MainPageProps> = (props) => {
  return useMemo(() => {
    const students =
      props.data?.students.reduce<UserNoNestingFragment[]>((curr, next) => {
        if (next) {
          curr.push(next)
        }
        return curr
      }, []) ?? []

    const completions =
      props.data?.codeChallengeCompletions.reduce<
        MainPageCodeChallengeCompletionFragment[]
      >((curr, next) => {
        if (next) {
          curr.push(next)
        }
        return curr
      }, []) ?? []

    const comments =
      props.data?.comments.reduce<Resource_Fragment[]>((curr, next) => {
        if (next) {
          curr.push(next)
        }
        return curr
      }, []) ?? []

    return (
      <MainPageViewStyled>
        <Typography variant="title">
          Изучайте современный JavaScript с нами совершенно бесплатно!
        </Typography>

        <MainPageStudents objects={students} />

        <MainPageCodeChallengeCompletions objects={completions} />

        <MainPageComments objects={comments} />
      </MainPageViewStyled>
    )
  }, [
    props.data?.codeChallengeCompletions,
    props.data?.comments,
    props.data?.students,
  ])
}

export default MainPageView
