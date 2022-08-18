import Link from 'next/link'
import React from 'react'

const IconItem = (props: {
  href: string
  className?: string
  icon: (props: { className?: string }) => JSX.Element
}) => (
  <Link href={props.href}>
    <a
      className={`p-1 text-text transition-all hover:text-brand dark:text-white ${props.className}`}
      target="__blank"
    >
      <props.icon className="" />
    </a>
  </Link>
)

export default IconItem
