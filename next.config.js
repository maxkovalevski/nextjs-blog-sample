/** @type {import('next').NextConfig} */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  reactStrictMode: true,
  env: {
    UTTERANCES_REPO: process.env.UTTERANCES_REPO,
    CONVERTKIT_ENDPOINT: process.env.CONVERTKIT_ENDPOINT,
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
}

