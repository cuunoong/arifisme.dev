import { gsap } from 'gsap'
import detail from './detail'
import homepage from './homepage'

export default function animation(page: 'home' | 'detail') {
  // prevent flashing
  gsap.to('html, body', { css: { visibility: 'visible' }, duration: 0 })

  if (page == 'home') homepage()
  else detail()
}
