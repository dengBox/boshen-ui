import { App } from 'vue'
import Button from './src/Index.vue'

Button.install = function (Vue: App) {
  Vue.component(Button.name, Button)
}

export default Button
