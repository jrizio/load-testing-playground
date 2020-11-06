import {
  step,
  TestSettings,
  TestData,
  Until,
  By,
  Browser,
  MouseButtons,
  Device,
  beforeAll,
} from '@flood/element'
import * as assert from 'assert'

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
 * Perecentage Step.if example
 * Authored by Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  let percentage = 0
  beforeAll(async () => {
    percentage = Math.floor(Math.random() * 99 + 1)
  })

  step.if(
    () => percentage < 21,
    '20Percent',
    async (browser) => {
      console.log('percentage = ' + percentage)
      console.log('Do this action 20% of the time when percentage is 1-20.')
    },
  )

  step.if(
    () => percentage > 20 && percentage < 51,
    '20to51Percent',
    async (browser) => {
      console.log('percentage = ' + percentage)
      console.log('Do this action 30% of the time when percentage is 21-50.')
    },
  )

  step.if(
    () => percentage > 50,
    '50to100Percent',
    async (browser) => {
      console.log('percentage = ' + percentage)
      console.log('Do this action 50% of the time when percentage is 50-100.')
    },
  )
}
