import React from 'react'

function MenuIcon(props: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <path d="M5 7H19" stroke="currentColor" strokeLinecap="round" />
      <path d="M5 12H19" stroke="currentColor" strokeLinecap="round" />
      <path d="M5 17H19" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

export default MenuIcon
