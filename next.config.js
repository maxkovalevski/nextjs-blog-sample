/** @type {import('next').NextConfig} */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  reactStrictMode: true,
  env: {
    SITE_URL: process.env.SITE_URL,
    UTTERANCES_REPO: process.env.UTTERANCES_REPO,
    UTTERANCES_ISSUETERM: process.env.UTTERANCES_ISSUETERM,
    UTTERANCES_LABEL: process.env.UTTERANCES_LABEL,
    UTTERANCES_ID: process.env.UTTERANCES_ID,
    CONVERTKIT_ENDPOINT: process.env.CONVERTKIT_ENDPOINT,
  }
}

