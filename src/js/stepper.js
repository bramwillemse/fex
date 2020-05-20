import { EVENTS } from './constants/events'
import { eventBus } from './utilities/event-bus'

const STEPPER = 'data-stepper'
const STEPPER_ITEM = 'data-stepper-item'
const STEPPER_NEXT = 'data-stepper-next-id'
const STEPPER_ITEM_CLASS_ACTIVE = 'is-active'
const STEPPER_ITEM_CLASS_ANIMATE_OUT = 'm-stepper-item--is-animating-out'

/*
STEPPER
-------
@TODO: set tabindices for items
*/

export class Stepper {
  constructor(stepper) {
    this.stepper = stepper
    if(!this.stepper) return

    this.registeredItems = []
    this.initialItemId = this.stepper.dataset.stepperInitialItem

    const items = [...this.stepper.querySelectorAll(`[${STEPPER_ITEM}]`)]

    items.forEach(item => {
      if(!item) return
      this.setupItemRegistry(item)
    })

    this.setupListeners()
  }

  setupListeners() {
    // Reset stepper to initial slide when dialog is closed
    eventBus.subscribe(EVENTS.DIALOG.CLOSED, () => {
      this.showItem(this.initialItemId)
    })
  }

  setupItemRegistry(element) {
    if(element._itemIsInitialized) return;

    const id = element.getAttribute('data-stepper-item')
    const buttonNext = element.querySelector(`[${STEPPER_NEXT}]`)
    const nextId = buttonNext.dataset.stepperNextId
    const item = {
      id,
      buttonNext,
      element,
      nextId
    }

    this.registeredItems.push(item)
    this.setupItemEventHandlers(item)

    element._itemIsInitialized = true;
  }

  setupItemEventHandlers(item) {
    item.buttonNext.addEventListener('click', () => this.showItem(item.nextId))
  }

  showItem(itemId) {
    this.registeredItems.forEach(item => {
      // if selected item
      if(item.id === itemId) {
        const firstFocusableElement = item.element.querySelector('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')

        firstFocusableElement.focus()

        setTimeout(() => {
          item.element.classList.add(STEPPER_ITEM_CLASS_ACTIVE)
        }, 300);

      // if active currently active item
      } else if(item.element.classList.contains(STEPPER_ITEM_CLASS_ACTIVE)) {
        this.hideItem(item.id)
      }
    })
  }

  // Animate out & hide item
  hideItem(itemId) {
    const item = this.registeredItems.find(item => item.id === itemId)
    const itemClassList = item.element.classList

    itemClassList.add(STEPPER_ITEM_CLASS_ANIMATE_OUT)

    setTimeout(() => {
      itemClassList.remove(STEPPER_ITEM_CLASS_ANIMATE_OUT)
      itemClassList.remove(STEPPER_ITEM_CLASS_ACTIVE)
    }, 300);
  }

}

window.addEventListener('DOMContentLoaded', () => {
  const steppers = [...document.querySelectorAll(`[${STEPPER}]`)]

  steppers.forEach(element => {
    new Stepper(element)
  })
})
