
const STEPPER = 'data-stepper'
const STEPPER_ITEM = 'data-stepper-item'
const STEPPER_NEXT = 'data-stepper-next-id'

export class Stepper {
  constructor(stepper) {
    this.stepper = stepper
    if(!this.stepper) return

    this.registeredStepperItems = {}

    const items = [...this.stepper.querySelectorAll(`[${STEPPER_ITEM}]`)]

    items.forEach(item => {
      if(!item) return
      this.setupItemRegistry(item)
    })
  }

  setupItemRegistry(element) {
    if(element._stepperItemIsInitialised) return;

    const id = element.getAttribute('data-stepper-item')
    const buttonNext = element.querySelector(`[${STEPPER_NEXT}]`)
    const nextId = buttonNext.dataset.stepperNextId

    const stepperItem = {
      buttonNext,
      nextId,
      element,
      id
    }

    // @TODO set tabindices of children

    this.registeredStepperItems[`stepper-${id}`] = stepperItem

    this.setupStepperItemEventHandlers(stepperItem)

    element._stepperItemIsInitialised = true;
  }

  setupStepperItemEventHandlers(stepperItem) {
    stepperItem.buttonNext.addEventListener('click', () => this.showNextItem(stepperItem))
  }

  showNextItem(currentItem) {
    if(currentItem.nextId === '-1') return

    const nextItem = this.registeredStepperItems[`stepper-${currentItem.nextId}`]

    currentItem.element.classList.remove('is-active')
    nextItem.element.classList.add('is-active')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const steppers = [...document.querySelectorAll(`[${STEPPER}]`)]

  steppers.forEach(element => {
    new Stepper(element)
  })
})
