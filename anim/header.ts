import { gsap } from 'gsap'
export default function header(delay = 2) {
  gsap.from('header', { duration: 1.5, y: '-100%', delay })
}
