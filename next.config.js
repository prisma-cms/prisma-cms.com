const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withTM = require('next-transpile-modules')(['@modxclub'])

module.exports = withBundleAnalyzer(withTM())
