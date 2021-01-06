const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withTM = require('next-transpile-modules')(['@modxclub'])

const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const withCSS = require('@zeit/next-css')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const webpack = (config) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config

  // console.log('config', config);

  config.module.rules.push({
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 100000,
      },
    },
  })

  config.plugins.push(
    new MonacoWebpackPlugin({
      // Add languages as needed...
      languages: ['html', 'css', 'javascript', 'typescript'],
      filename: 'static/[name].worker.js',
    })
  )

  /**
   * Fix locales issue
   * https://github.com/moment/moment/issues/2517#issuecomment-620674018
   */
  config.plugins.push(
    new MomentLocalesPlugin({
      localesToKeep: ['ru'],
    })
  )

  // Object.assign(config, {
  //   // https://nextjs.org/docs/api-reference/next.config.js/disabling-etag-generation
  //   generateEtags: false,
  // });

  return config

  // Important: return the modified config
  // return {
  //   ...config,

  //   // https://nextjs.org/docs/api-reference/next.config.js/disabling-etag-generation
  //   generateEtags: false,
  // }
}

const config = withBundleAnalyzer(
  withTM(
    withCSS({
      webpack,
    })
  )
)

module.exports = {
  ...config,

  // https://nextjs.org/docs/api-reference/next.config.js/disabling-etag-generation
  // generateEtags: false,
}
