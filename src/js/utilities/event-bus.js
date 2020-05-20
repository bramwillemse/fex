
const eventBus = {
  events: {}
}

eventBus.subscribe = (event, callback) => {
  if (!eventBus.events.hasOwnProperty(event)) {
    eventBus.events[event] = []
  }

  eventBus.events[event].push(callback)
}

eventBus.publish = (event, data) => {
  if (!eventBus.events.hasOwnProperty(event)) return

  eventBus.events[event].forEach((callback) => {
    callback(data)
  })
}

export {
  eventBus
}

