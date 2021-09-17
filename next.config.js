/** @type {import('next').NextConfig} */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  target: 'serverless',
  reactStrictMode: true,
  env: {
    UTTERANCES_REPO: process.env.UTTERANCES_REPO,
    CONVERTKIT_ENDPOINT: process.env.CONVERTKIT_ENDPOINT,
    SITE_URL: process.env.SITE_URL,
  },
  async redirects() {
    return [
      {
        source: '/blog/article/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      canvas: "commonjs canvas"
    };
    // Important: return the modified config
    return config
  },
}

