import React from 'react'

function Button(props: {
  type?: 'default' | 'filled'
  className?: string
  children: JSX.Element | string
  onClick?: () => void
  as?: 'a'
}) {
  return (
    <button
      className={`select-none rounded-full px-6 py-2 text-sm leading-[1.6] transition-all ${
        !props.type || props.type === 'default'
          ? 'border border-brand hover:bg-brand/10'
          : 'bg-brand text-white'
      } ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
