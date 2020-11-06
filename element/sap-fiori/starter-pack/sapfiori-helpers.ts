import moment from 'moment'

/**
 * a self-baked network-idle watcher
 * @param {*} page
 * @param {*} timeout
 * @param {*} maxInflightRequests
 */
export const waitForNetworkIdle = (page, timeout) => {
  let lastTime
  let inFlight = 0
  function onTimeoutDone() {
    timers.shift()
    if (timers.length === 0) {
      if (inFlight) {
        console.log(
          'waitForNetworkIdle.onTimeoutDone (inFlight): ',
          inFlight,
          ' continuing',
        )
        timers.push(setTimeout(onTimeoutDone, timeout))
      } else {
        console.log('waitForNetworkIdle.onTimeoutDone fulfill()')
        page.removeListener('request', onRequest)
        page.removeListener('requestfinished', onRequestFinishOrFail)
        page.removeListener('requestfailed', onRequestFinishOrFail)
        fulfill()
        console.log('waitForNetworkIdle.onTimeoutDone COMPLETED')
      }
    } else {
      console.log('waitForNetworkIdle.onTimeoutDone timers: ', timers.length)
    }
  }

  const onRequest = async () => {
    inFlight++
    console.log('waitForNetworkIdle.onRequest inFlight: ', inFlight)
    // clear timeout, wait for request to finish
    clearTimeout(timers.shift())
    timers.push(setTimeout(onTimeoutDone, timeout))
    console.log('waitForNetworkIdle.onRequest timers: ', timers.length)
    lastTime = moment().format('X')
  }

  const onRequestFinishOrFail = async () => {
    console.log('waitForNetworkIdle.onRequestFinishOrFail inFlight: ', inFlight)
    // clear timeout, wait for request to finish
    clearTimeout(timers.shift())
    timers.push(setTimeout(onTimeoutDone, timeout))
    console.log(
      'waitForNetworkIdle.onRequestFinishOrFail timers: ',
      timers.length,
    )
    lastTime = moment().format('X')
    if (inFlight > 0) inFlight--
  }

  page.on('request', onRequest)
  page.on('requestfinished', onRequestFinishOrFail)
  page.on('requestfailed', onRequestFinishOrFail)

  const timers = []
  let fulfill
  let promise = new Promise((resolve, reject) => {
    fulfill = resolve
  })
  console.log('waitForNetworkIdle setTimeout()')
  timers.push(setTimeout(onTimeoutDone, timeout))

  return promise
}
