import header from './header'
import { gsap } from 'gsap'

export default function detail() {
  header(1)
  const tl = gsap.timeline()
  tl.from('.prose > *', {
    duration: 1.2,
    opacity: 0,
    y: 100,
    ease: 'power4.out',
    skewY: 7,
    stagger: {
      amount: 0.7,
    },
  })
}
