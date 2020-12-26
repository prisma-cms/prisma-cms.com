import React from 'react'
import { NextSeo } from 'next-seo'
import { Page } from 'src/pages/_App/interfaces'
import TopicView from '../View'

const CreatTopicPage: Page = () => {
  return (
    <>
      <NextSeo
        title="Новая публикация"
        description="Новость или вопрос"
        noindex
        nofollow
      />

      <TopicView object={undefined} />
    </>
  )
}

export default CreatTopicPage
