import type { DrawImgOption } from '../interface/drawImg'

export default class DrawImg {
  el?: Node
  constructor (options: DrawImgOption) {
    if (!options?.el) console.warn('DrawImg After initialization Node')
    this.el = options?.el
  }

  // -----------life style------------
  mounte (el: Node) {
    if (!el) throw new Error('Node is required !')
    this.getCtx()
  }

  unmount () {}
  // -----------utils------------
  getCtx () {}
}
