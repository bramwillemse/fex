import { disableBodyScroll, enableBodyScroll } from '../utilities/body-scroll'

/*
DIALOG
------
Open a dialog with a static trigger
*/

const DIALOG_TRIGGER = 'data-dialog-trigger'
const DIALOG_CLOSE = 'data-dialog-close'
const ACTIVE_CLASS = 'is-active'

export class Dialog {
  constructor({ triggerElement, dialogId }) {
    this.dialog = document.getElementById(dialogId)
    if (!this.dialog) return

    this.triggerElement = triggerElement
    this.closeButtons = [...this.dialog.querySelectorAll(`[${DIALOG_CLOSE}]`)]
    this.focusableElements = [...this.dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')]

    this.setupEventHandlers()
  }

  setupEventHandlers() {
    if (this.triggerElement) {
      this.triggerElement.addEventListener('click', event => {
        event.preventDefault()
        this.activeElementBeforeOpen = event.target
        this.open()
      })
    }

    this.closeButtons.forEach(button =>
      button.addEventListener('click', event => {
        event.preventDefault()
        this.close()
      })
    )

    this.dialog.addEventListener('keydown', event => this.handleKeydown(event), true)
  }

  handleKeydown(event) {
    if(event.key === "Escape") this.close()
  }

  open() {
    this.dialog.classList.add(ACTIVE_CLASS)
    this.focusableElements[0].focus()
    disableBodyScroll()
  }

  close() {
    this.dialog.classList.remove(ACTIVE_CLASS)
    this.activeElementBeforeOpen.focus()
    enableBodyScroll()
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const dialogTriggers = [...document.querySelectorAll(`[${DIALOG_TRIGGER}]`)]

  dialogTriggers.forEach(element => {
    const dialogId = element.getAttribute('aria-controls')

    new Dialog({
      triggerElement: element,
      dialogId
    })
  })
})
