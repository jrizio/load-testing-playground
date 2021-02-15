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
  description: 'Detect Popup window and handle',
  screenshotOnFailure: true,
  disableCache: true,
  clearCache: true,
  clearCookies: true,
  actionDelay: 6.5,
  stepDelay: 6.5,
  browser: 'webkit',
}

/**
 * Detect a popup object and if visible then action
 * Authored by Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  let popupVisible

  step('Popup Example: Home', async (browser) => {
    //Navigate to the SAP Fiori Demo Application
    await browser.visit('https://wordpress.loadtest.io/sample-page/', {
      waitUntil: 'load',
      timeout: 30000,
    })

    try {
      //lets check to see if the modal is displayed
      popupVisible = await (
        await browser.findElement(
          By.css('#sgpb-popup-dialog-main-div-wrapper > div > img'),
        )
      ).isDisplayed()
    } catch {}
    //console.log(popupVisible)
  })

  step.if(
    () => popupVisible == true,
    'Popup Example: Detect and Handle',
    async (browser) => {
      console.log('popupVisible = ' + popupVisible)
      console.log('Lets handle the popup in this step here.')
    },
  )
}
