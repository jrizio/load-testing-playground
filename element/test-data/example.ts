import {
  step,
  TestSettings,
  Until,
  By,
  Browser,
  TestData,
  ENV,
} from '@flood/element'

/**
 * Unique Test Data
 * Version: 2.0
 */
export default () => {
  const globalBrowserID = `${ENV.FLOOD_GRID_NODE_SEQUENCE_ID}_${ENV.BROWSER_ID}`
  interface UserData {
    id: string
    username: string
    password: string
  }
  TestData.fromCSV<UserData>('users.csv')
    .filter((line, index, browserID) => line.id === globalBrowserID)
    .circular()

  step('Print to console', async (browser: Browser, data: UserData) => {
    console.log(
      'global browser ID: ',
      globalBrowserID,
      '| user: ',
      `${data.username}`,
      ' | password: ',
      `${data.password}`,
    )
  })
}

export const settings: TestSettings = {
  loopCount: -1,
  description: 'Unique Test Data',
  screenshotOnFailure: true,
  disableCache: true,
  clearCache: true,
  clearCookies: true,
  actionDelay: 1.5,
  stepDelay: 2.5,
}