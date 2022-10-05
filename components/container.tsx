import React from 'react'
import Footer from './footer'
import Header, { HeaderProp } from './header'

interface Prop extends HeaderProp {
  children?: any
  className?: string
}

function Container(prop: Prop) {
  return (
    <>
      <Header
        title={prop.title}
        description={prop.description}
        image={prop.image}
      />
      <main className="flex min-h-screen flex-col justify-between">
        <div className={prop.className}>{prop.children}</div>
        <Footer />
      </main>
    </>
  )
}

export default Container
