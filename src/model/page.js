export function Dialog() {
  this.visible = false
  this.temp = {}
  this.title = ''
  this.mode = 'insert'
}

Dialog.prototype = {
  constructor: Dialog,

  setItem(item) {
    this.temp = item
  },

  close() {
    this.visible = false
    this.temp = {}
  },

  open(mode) {
    this.mode = mode
    this.visible = true
  },
  getMode() {
    return this.mode
  }

}
