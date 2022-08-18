import React from 'react'

function Decoration(props: { className?: string }) {
  return (
    <svg
      width="801"
      height="800"
      viewBox="0 0 801 800"
      fill="none"
      className={props.className}
    >
      <path
        opacity="0.5"
        d="M462.218 400.272C462.218 434.547 434.536 462.329 400.393 462.329C366.25 462.329 338.568 434.547 338.568 400.272C338.568 365.997 366.25 338.215 400.393 338.215C434.536 338.215 462.218 365.997 462.218 400.272Z"
        stroke="currentColor"
      />
      <path
        opacity="0.5"
        d="M522.654 399.802C522.654 467.585 467.705 522.535 399.921 522.535C332.137 522.535 277.188 467.585 277.188 399.802C277.188 332.018 332.137 277.069 399.921 277.069C467.705 277.069 522.654 332.018 522.654 399.802Z"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      <circle
        opacity="0.5"
        cx="399.921"
        cy="400.043"
        r="186.002"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <circle
        opacity="0.5"
        cx="400.069"
        cy="399.521"
        r="256.973"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <path
        opacity="0.5"
        d="M722.502 399.452C722.502 577.705 578 722.207 399.748 722.207C221.495 722.207 76.9932 577.705 76.9932 399.452C76.9932 221.2 221.495 76.6975 399.748 76.6975C578 76.6975 722.502 221.2 722.502 399.452Z"
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      <circle
        opacity="0.5"
        cx="400.069"
        cy="400"
        r="399.478"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="1.0442"
      />
    </svg>
  )
}

export default Decoration
