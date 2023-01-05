// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './thema.scss'

import '../../../styles/index.scss'
import shscUI from '../../../src/components/index'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(shscUI)
  }
}
