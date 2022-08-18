import { gsap } from 'gsap'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
let mouse = { x: 0, y: 0 }
function Cursor() {
  const router = useRouter()
  useEffect(() => {
    const mouseMoveEvent = (ev: MouseEvent) => {
      let posX = 0,
        posY = 0
      if (ev.clientX || ev.clientY) {
        posX = ev.clientX
        posY = ev.clientY
      }
      mouse = { x: posX, y: posY }
    }
    gsap.from(document.querySelector('main'), {
      opacity: 0,
      duration: 1,
      ease: 'Power3.easeInOut',
    })

    new CursorClass(document.querySelector('#cursor'))

    window.addEventListener('mousemove', mouseMoveEvent)
    return () => {
      window.removeEventListener('mousemove', mouseMoveEvent)
    }
  }, [router.route])

  return (
    <div
      id="cursor"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden before:absolute before:-top-6 before:-left-6 before:block before:h-12 before:w-12 before:scale-[0.2] before:rounded-full before:bg-black dark:before:bg-white md:block"
      style={{ contain: 'layout style size' }}
    >
      <div className="absolute z-50 -ml-16 -mt-16 block h-32 w-32 scale-0 overflow-hidden rounded-full bg-black  "></div>
    </div>
  )
}

export default Cursor

class CursorClass {
  Cursor: any
  Item: NodeListOf<Element>
  Hero: any
  bounds: any
  cursorConfigs: {
    x: { previous: number; current: number; amt: number }
    y: { previous: number; current: number; amt: number }
  }
  onMouseMoveEv: () => void
  constructor(el: any) {
    // Varibles
    this.Cursor = el
    this.Cursor.style.opacity = 0
    this.Item = document.querySelectorAll('button, a')
    this.bounds = this.Cursor.getBoundingClientRect()
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.1 },
      y: { previous: 0, current: 0, amt: 0.1 },
    }
    this.initialize()
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y

      // Set cursor opacity to 1 when hovered on screen
      gsap.to(this.Cursor, {
        duration: 1,
        ease: 'Power3.easeOut',
        opacity: 1,
      })
      // Execute scale function
      this.onScaleMouse()

      // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
      requestAnimationFrame(() => this.render())
      // Clean up function
      window.removeEventListener('mousemove', this.onMouseMoveEv)
    }
    // Scale cursor animation
    window.addEventListener('mousemove', this.onMouseMoveEv)
  }

  initialize() {
    this.Cursor.classList.remove('mix-blend-exclusion')
    this.Cursor.children[0].classList.remove('invert')

    this.ScaleCursor(this.Cursor.children[0], 0)
  }

  onScaleMouse() {
    // Loop through all items
    this.Item.forEach((link) => {
      // If I am hovering on the item for on page load I want to scale the cursor media
      if (link.matches(':hover')) {
        this.Cursor.classList.add('mix-blend-exclusion')
        this.Cursor.children[0].classList.add('invert')

        this.ScaleCursor(this.Cursor.children[0], 0.8)
      }
      //On mouse enter scale the media-cursor to .8
      link.addEventListener('mouseover', () => {
        this.Cursor.classList.add('mix-blend-exclusion')
        this.Cursor.children[0].classList.add('invert')
        this.ScaleCursor(this.Cursor.children[0], 0.8)
      })
      //On mouse enter scale the media-cursor to 0
      link.addEventListener('mouseout', () => {
        this.Cursor.classList.remove('mix-blend-exclusion')
        this.Cursor.children[0].classList.remove('invert')

        this.ScaleCursor(this.Cursor.children[0], 0)
      })
    })
  }

  ScaleCursor(el: any, amount: number) {
    gsap.to(el, {
      duration: 0.6,
      scale: amount,
      ease: 'Power3.easeOut',
    })
  }
  render() {
    this.cursorConfigs.x.current = mouse.x
    this.cursorConfigs.y.current = mouse.y

    // lerp
    this.cursorConfigs.x.previous = lerp(
      this.cursorConfigs.x.previous,
      this.cursorConfigs.x.current,
      this.cursorConfigs.x.amt
    )

    this.cursorConfigs.y.previous = lerp(
      this.cursorConfigs.y.previous,
      this.cursorConfigs.y.current,
      this.cursorConfigs.y.amt
    )
    // Setting the cursor x and y to our cursoer html element
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`
    // RAF
    requestAnimationFrame(() => this.render())
  }
}

function lerp(previous: number, current: number, amt: number): number {
  return (1 - amt) * previous + amt * current
}
