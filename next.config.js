const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withTM = require('next-transpile-modules')(['@modxclub'])

const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const webpack = (config) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config

  /**
   * Fix locales issue
   * https://github.com/moment/moment/issues/2517#issuecomment-620674018
   */
  config.plugins.push(
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    })
  )

  // Important: return the modified config
  return config
}

module.exports = withBundleAnalyzer(
  withTM({
    webpack,
  })
)
