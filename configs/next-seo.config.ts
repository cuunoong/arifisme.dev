import id from '../lang/id'

export default {
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    site_name: id.title,
    image: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
  },
  twitter: {
    handle: '@cuunoongs',
    site: '@cuunoongs',
    cardType: 'summary_large_image',
    image: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
  },
}
