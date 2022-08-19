import { gsap } from 'gsap'
import header from './header'

// homepage animation
const homepage = () => {
  header()

  const tl = gsap.timeline()
  tl.from('#hero h1 .line .line-animate', {
    duration: 1.2,
    opacity: 0,
    y: 100,
    ease: 'power4.out',
    delay: 1,
    skewY: 12,
    stagger: {
      amount: 0.3,
    },
  })
    .from('#hero .desc', {
      duration: 0.3,
      opacity: 0,
      y: 10,
      ease: 'power4.out',
    })
    .from('#lessons .card', {
      opacity: 0,
      duration: 1,
      y: 50,
      stagger: { amount: 0.3 },
    })
}
export default homepage
