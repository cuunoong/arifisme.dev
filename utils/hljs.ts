import hljs from 'highlight.js/lib/core'
import dart from 'highlight.js/lib/languages/dart'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('dart', dart)
hljs.registerLanguage('javascript', javascript)

import 'highlight.js/styles/github-dark.css'

export default hljs
