declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '*.vue' {
//   export export const ignoreDir: string[];
// }

declare interface Window {
  Vue?: any;
}
