import { step, TestSettings, Browser, TestData, ENV } from '@flood/element'

export const settings: TestSettings = {
  loopCount: 1,
  description: 'Unique Test Data',
  screenshotOnFailure: true,
  disableCache: true,
  clearCache: true,
  clearCookies: true,
  actionDelay: 2.5,
  stepDelay: 2.5,
}

/**
 * Unique Test Data Example
 * Authored by Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  //declare a global variable that contains the Grid node index (starting from 0)
  //followed by the node index (starting from 0)
  //and lastly the browser id index (also starting from 0)
  const globalBrowserID = `${ENV.FLOOD_GRID_INDEX}_${ENV.FLOOD_NODE_INDEX}_${ENV.BROWSER_ID}`

  //first row should be '0_0_0'
  console.log(globalBrowserID)

  //declare the interface for the UserData structure
  interface UserData {
    id: string
    username: string
    password: string
  }

  //filter the data for this user - locally through Element CLI it will be '0_0_0' each time
  TestData.fromCSV<UserData>('users.csv')
    .filter((line, index, browserID) => line.id === globalBrowserID)
    .circular()

  //print the values fromteh CSV for this user to the console
  step('Print to console', async (browser: Browser, data: UserData) => {
    let { username, password } = data
    console.log(
      'globalBrowserID: ' +
        globalBrowserID +
        ' username: ' +
        username +
        ' password: ' +
        password,
    )
  })
}
