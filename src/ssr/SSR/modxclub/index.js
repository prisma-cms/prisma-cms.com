const XMLWriter = require('xml-writer')

import SSR from '../'

export class ModxclubSSR extends SSR {
  /**
   * Рендеринк карты сайта.
   * Отдельные разделы с постраничностью:
   * 1. Пользователи
   * 2. Ресурсы
   * 3. Теги
   */
  async renderSitemap(req, res, uri) {
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

      default:
        return this.renderRootSitemap(req, res, uri)
    }
  }

  renderRootSitemap(req, res, uri) {
    const cleanUri = uri.clone().query(null)
    // .hostname("mamba.zone");

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
  async renderMainSitemap(req, res, uri) {
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
  async renderUsersSitemap(req, res, uri) {
    const api = this.getApi()

    let { page } = uri.query(true)

    page = (page && parseInt(page)) || undefined

    const limit = 1000

    const usersSchema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            username
            updatedAt
          }
        }
      }
    `

    const usersResult = await api.query.usersConnection(
      {
        first: limit,
        skip: page > 1 ? (page - 1) * limit : undefined,
        where: {
          active: true,
          deleted: false,
        },
        orderBy: 'updatedAt_DESC',
      },
      usersSchema
    )
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: { count: total },
      edges: usersEdges,
    } = usersResult

    const users = usersEdges.map(({ node }) => node)

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
        const { username, updatedAt } = user

        this.addSitemapDocument(xml, uri, {
          url: `/profile/${username}/`,
          updatedAt,
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

        const pageUri = uri.clone().query({
          section: 'users',
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
   * Ресурсы
   */
  async renderResourcesSitemap(req, res, uri) {
    const api = this.getApi()

    let { page } = uri.query(true)

    uri = uri.query({
      section: 'resources',
    })

    page = (page && parseInt(page)) || undefined

    const limit = 1000

    const schema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            uri
            updatedAt
          }
        }
      }
    `

    const objectsResult = await api.query.resourcesConnection(
      {
        first: limit,
        skip: page > 1 ? (page - 1) * limit : undefined,
        where: {
          published: true,
          searchable: true,
          deleted: false,
        },
        orderBy: 'updatedAt_DESC',
      },
      schema
    )
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: { count: total },
      edges: edges,
    } = objectsResult

    const objects = edges.map(({ node }) => node)

    const pages = Math.ceil(total / limit)

    const xml = new XMLWriter()

    xml.startDocument('1.0', 'UTF-8')

    if (page) {
      xml
        .startElement('urlset')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
      objects.map((n) => {
        const { uri: url, updatedAt } = n

        this.addSitemapDocument(xml, uri, {
          url,
          updatedAt,
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
  async renderTagsSitemap(req, res, uri) {
    const api = this.getApi()

    let { page } = uri.query(true)

    uri = uri.query({
      section: 'tags',
    })

    page = (page && parseInt(page)) || undefined

    const limit = 1000

    const schema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            name
            updatedAt
          }
        }
      }
    `

    const objectsResult = await api.query.tagsConnection(
      {
        first: limit,
        skip: page > 1 ? (page - 1) * limit : undefined,
        where: {
          status_not: 'Blocked',
        },
        orderBy: 'updatedAt_DESC',
      },
      schema
    )
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: { count: total },
      edges: edges,
    } = objectsResult

    const objects = edges.map(({ node }) => node)

    const pages = Math.ceil(total / limit)

    const xml = new XMLWriter()

    xml.startDocument('1.0', 'UTF-8')

    if (page) {
      xml
        .startElement('urlset')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9')
      objects.map((n) => {
        const { name, updatedAt } = n

        const url = `/tag/${name}`

        this.addSitemapDocument(xml, uri, {
          url,
          updatedAt,
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

module.exports = ModxclubSSR
