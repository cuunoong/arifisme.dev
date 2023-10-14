/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {},
  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: '/links',
        destination: 'https://linktr.ee/cuunoong',
        permanent: false,
      },
      {
        source: '/timesheet/:slug*',
        destination: '/api/timesheet/:slug*',
        permanent: true,
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
