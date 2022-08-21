import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import codeStyle from './code-style'

function Code({ ...props }: { className?: string; children?: any }) {
  return props.className ? (
    <SyntaxHighlighter
      PreTag="div"
      language={props.className.split('-')[1]}
      style={codeStyle}
    >
      {props.children}
    </SyntaxHighlighter>
  ) : (
    <code {...props} />
  )
}

export default Code
