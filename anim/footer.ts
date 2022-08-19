import { gsap } from 'gsap'
export default function footer(delay = 2) {
  gsap.from('footer', { duration: 1.5, opacity: 0, delay })
}
