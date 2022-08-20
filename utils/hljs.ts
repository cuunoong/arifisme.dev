import hljs from 'highlight.js/lib/core'
import dart from 'highlight.js/lib/languages/dart'
import javascript from 'highlight.js/lib/languages/javascript'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('dart', dart)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('yaml', yaml)

import 'highlight.js/styles/github-dark.css'

export default hljs
