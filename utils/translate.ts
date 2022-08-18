import en from '../lang/en'
import id from '../lang/id'

export default function translate(locale?: string) {
  if (locale == 'en') return en
  return id
}
