// eslint-disable-next-line no-restricted-modules
const XMLWriter = require('xml-writer')

import URI from 'urijs'
import { Request, Response } from 'express'

import Sitemap from '../'
// import {
//   // ResourceConnection,
//   // TagConnection,
//   UserConnection,
// } from 'src/modules/gql/generated';
import { initializeApollo } from '../../../../lib/apolloClient'
import {
  SitemapUsersConnectionQuery,
  SitemapUsersConnectionDocument,
  SitemapUsersConnectionQueryVariables,
  UserOrderByInput,
  SitemapResourcesConnectionQuery,
  SitemapResourcesConnectionQueryVariables,
  SitemapResourcesConnectionDocument,
  ResourceOrderByInput,
  SitemapTagsConnectionQuery,
  SitemapTagsConnectionQueryVariables,
  SitemapTagsConnectionDocument,
  TagOrderByInput,
  TagStatus,
} from '../../../../modules/gql/generated'

const apolloClient = initializeApollo(undefined, false)

export default class PrismaCmsComSitemap extends Sitemap {
  /**
   * Рендеринк карты сайта.
   * Отдельные разделы с постраничностью:
   * 1. Пользователи
   * 2. Ресурсы
   * 3. Теги
   */
  async renderSitemap(req: Request, res: Response, uri: URI) {
    const { section } = uri.query(true)

    switch (section) {
      case 'main':
        return this.renderMainSitemap(req, res, uri)

      case 'users':
        return this.renderUsersSitemap(req, res, uri)

      case 'resources':
        return this.renderResourcesSitemap(req, res, uri)

      case 'tags':
        return this.renderTagsSitemap(req, res, uri)

      case undefined:
        return this.renderRootSitemap(req, res, uri)

      default:
        throw new Error('Invalid section')
    }
  }

  renderRootSitemap(_req: Request, res: Response, uri: URI) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const cleanUri = uri.clone().query(null)

    /**
     * Выводим ссылки на разделы
     */
    const xml = new XMLWriter()

    xml.startDocument('1.0', 'UTF-8')

    xml
      .startElement('sitemapindex')
      .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
    /**
     * Формируем ссылки на разделы
     */
    const mainUri = cleanUri.clone().query({
      section: 'main',
    })

    const usersUri = cleanUri.clone().query({
      section: 'users',
    })

    const resourcesUri = cleanUri.clone().query({
      section: 'resources',
    })

    const tagsUri = cleanUri.clone().query({
      section: 'tags',
    })

    xml
      .startElement('sitemap')
      .writeElement('loc', mainUri.toString())
      .endElement()

    xml
      .startElement('sitemap')
      .writeElement('loc', usersUri.toString())
      .endElement()

    xml
      .startElement('sitemap')
      .writeElement('loc', resourcesUri.toString())
      .endElement()

    xml
      .startElement('sitemap')
      .writeElement('loc', tagsUri.toString())
      .endElement()

    xml.endDocument()

    res.charset = 'utf-8'

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    res.end(xml.toString())
  }

  /**
   * Основные страницы
   */
  async renderMainSitemap(_req: Request, res: Response, uri: URI) {
    const xml = new XMLWriter()

    xml.startDocument('1.0', 'UTF-8')

    xml
      .startElement('urlset')
      .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
    this.addSitemapDocument(xml, uri, {
      url: `/`,
      priority: 1,
    })

    this.addSitemapDocument(xml, uri, {
      url: `/comments/`,
      priority: 0.6,
    })

    this.addSitemapDocument(xml, uri, {
      url: `/people/`,
      priority: 0.5,
    })

    xml.endDocument()

    res.charset = 'utf-8'

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    res.end(xml.toString())

    return
  }

  /**
   * Пользователи
   */
  async renderUsersSitemap(_req: Request, res: Response, uri: URI) {
    const page = this.getQueryPage(uri)

    const limit = 1000

    const usersResult = await apolloClient.query<
      SitemapUsersConnectionQuery,
      SitemapUsersConnectionQueryVariables
    >({
      query: SitemapUsersConnectionDocument,
      variables: {
        first: limit,
        skip: page && page > 1 ? (page - 1) * limit : undefined,
        where: {
          active: true,
          deleted: false,
        },
        orderBy: UserOrderByInput.UPDATEDAT_DESC,
      },
    })

    const {
      aggregate: { count: total },
      edges: usersEdges,
    } = usersResult.data.usersConnection

    const users = usersEdges.map((n) => n?.node)

    /**
     * Плюсуем количество статических страниц
     */
    // let total = totalUsers;

    const pages = Math.ceil(total / limit)

    const xml = new XMLWriter()

    xml.startDocument('1.0', 'UTF-8')

    if (page) {
      xml
        .startElement('urlset')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
      users.map((user) => {
        if (!user) {
          return null
        }

        const { username, updatedAt } = user

        this.addSitemapDocument(xml, uri, {
          url: `/profile/${username}/`,
          updatedAt: updatedAt.toISOString(),
          priority: 0.8,
        })
      })
    } else {
      xml
        .startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')

      let i = 0

      while (pages > i) {
        i++

        const query: URI.QueryDataMap = {
          section: 'users',
          page: String(i),
        }

        const pageUri = uri.clone().query(query)

        xml
          .startElement('sitemap')
          .writeElement('loc', pageUri.toString())
          .endElement()
      }
    }

    xml.endDocument()

    res.charset = 'utf-8'

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    res.end(xml.toString())

    return
  }

  /**
   * Ресурсы
   */
  async renderResourcesSitemap(_req: Request, res: Response, uri: URI) {
    const page = this.getQueryPage(uri)

    uri = uri.query({
      section: 'resources',
    })

    const limit = 1000

    const objectsResult = await apolloClient.query<
      SitemapResourcesConnectionQuery,
      SitemapResourcesConnectionQueryVariables
    >({
      query: SitemapResourcesConnectionDocument,
      variables: {
        first: limit,
        skip: page && page > 1 ? (page - 1) * limit : undefined,
        where: {
          published: true,
          searchable: true,
          deleted: false,
        },
        orderBy: ResourceOrderByInput.UPDATEDAT_DESC,
      },
    })

    const {
      aggregate: { count: total },
      edges: edges,
    } = objectsResult.data.resourcesConnection

    const objects = edges.map((n) => n?.node)

    const pages = Math.ceil(total / limit)

    const xml = new XMLWriter()

    xml.startDocument('1.0', 'UTF-8')

    if (page) {
      xml
        .startElement('urlset')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
      objects.map((n) => {
        if (!n) {
          return null
        }

        const { uri: url, updatedAt } = n

        this.addSitemapDocument(xml, uri, {
          url,
          updatedAt: updatedAt.toISOString(),
          priority: 0.9,
        })
      })
    } else {
      xml
        .startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')

      let i = 0

      while (pages > i) {
        i++

        const pageUri = uri.clone().addQuery({
          page: i,
        })

        xml
          .startElement('sitemap')
          .writeElement('loc', pageUri.toString())
          .endElement()
      }
    }

    xml.endDocument()

    res.charset = 'utf-8'

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    res.end(xml.toString())

    return
  }

  /**
   * Теги
   */
  async renderTagsSitemap(_req: Request, res: Response, uri: URI) {
    const page = this.getQueryPage(uri)

    uri = uri.query({
      section: 'tags',
    })

    const limit = 1000

    // const objectsResult: TagConnection = await api.query.tagsConnection({
    //   first: limit,
    //   skip: page && page > 1 ? (page - 1) * limit : undefined,
    //   where: {
    //     status_not: "Blocked",
    //   },
    //   orderBy: "updatedAt_DESC",
    // }, schema)
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const objectsResult = await apolloClient.query<
      SitemapTagsConnectionQuery,
      SitemapTagsConnectionQueryVariables
    >({
      query: SitemapTagsConnectionDocument,
      variables: {
        first: limit,
        skip: page && page > 1 ? (page - 1) * limit : undefined,
        where: {
          status_not: TagStatus.BLOCKED,
        },
        orderBy: TagOrderByInput.UPDATEDAT_DESC,
      },
    })

    const {
      aggregate: { count: total },
      edges: edges,
    } = objectsResult.data.tagsConnection

    const objects = edges.map((n) => n?.node)

    const pages = Math.ceil(total / limit)

    const xml = new XMLWriter()

    xml.startDocument('1.0', 'UTF-8')

    if (page) {
      xml
        .startElement('urlset')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
      objects.map((n) => {
        if (!n) {
          return null
        }

        const { name, updatedAt } = n

        const url = `/tag/${name}`

        this.addSitemapDocument(xml, uri, {
          url,
          updatedAt: updatedAt.toISOString(),
          priority: 0.9,
        })
      })
    } else {
      xml
        .startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')

      let i = 0

      while (pages > i) {
        i++

        const pageUri = uri.clone().addQuery({
          page: i,
        })

        xml
          .startElement('sitemap')
          .writeElement('loc', pageUri.toString())
          .endElement()
      }
    }

    xml.endDocument()

    res.charset = 'utf-8'

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    res.end(xml.toString())

    return
  }
}
