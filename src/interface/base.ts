import { App } from 'vue'

export interface Config {
  size?: string,
  prefix?: string
}

export interface Component {
  install: (vue: App) => {}
}

export interface Components {
  [propname:string]: Component
}