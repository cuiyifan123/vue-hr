function dispatch(componentName, eventName, params) {
  let parent = this.$parent || this.$root
  let name = parent.$options.componentName
  while (parent && (!name || componentName !== name)) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.componentName
    }
  }
  if (parent) {
    parent.$emit(eventName, params)
  }
}

function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.componentName
    if (name === componentName) {
      child.$emit(eventName, params)
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    dispatch,
    broadcast
  }
}
