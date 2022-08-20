import { gsap } from 'gsap'
import detail from './detail'
import footer from './footer'
import header from './header'
import homepage from './homepage'

export default function animation(page: 'home' | 'detail') {
  // prevent flashing
  gsap.to('html, body', { css: { visibility: 'visible' }, duration: 0 })

  if (window.location.hash) {
    header()
    footer()
  } else {
    if (page == 'home') homepage()
    else detail()
  }
}
