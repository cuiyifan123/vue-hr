export const to = (promise) => {
  return promise.then((res) => {
    return [undefined, res]
  }).catch(reason => {
    return [reason, undefined]
  })
}
