import React from 'react'

function Button(props: {
  type?: 'default' | 'filled'
  className?: string
  children: JSX.Element | string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      className={`select-none rounded-full px-6 py-2 text-sm leading-[1.6] transition-all ${
        !props.type || props.type === 'default'
          ? `border ${
              props.disabled
                ? 'border-brand/25'
                : 'border-brand hover:bg-brand/10'
            }`
          : props.disabled
          ? 'bg-brand/25 text-white'
          : 'bg-brand text-white'
      } ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
