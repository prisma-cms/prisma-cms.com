import { NextSeo } from 'next-seo'

const Page404: React.FC = () => {
  return (
    <>
      <NextSeo noindex nofollow title="Страница не найдена" />
      <h2>Страница не найдена</h2>
    </>
  )
}

export default Page404
