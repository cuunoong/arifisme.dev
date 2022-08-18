import { DefaultSeoProps } from 'next-seo'

export default {
  defaultOpenGraphImageWidth: 800,
  defaultOpenGraphImageHeight: 600,
  canonical: process.env.NEXT_PUBLIC_APP_URL,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    site_name: 'SiteName',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg` }],
  },
  twitter: {
    handle: '@cuunoongs',
    site: '@cuunoongs',
    cardType: 'summary_large_image',
  },
} as DefaultSeoProps
