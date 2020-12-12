import { NextSeo } from 'next-seo'
import { Page } from '../../_App/interfaces'

/**
 * Просмотр статистики страниц с ошибками
 */
const VisitorsPage: Page = () => {
  return (
    <>
      <NextSeo
        noindex
        title="Статистика по страницам"
        description="Просмотр страниц с ошибками"
      />
    </>
  )
}

export default VisitorsPage
