// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

// next-transpile-modules not required after upgrade

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true
}

nextConfig = withBundleAnalyzer(nextConfig)

module.exports = nextConfig
