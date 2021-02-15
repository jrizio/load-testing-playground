import { step, TestSettings, Until, By, Key } from '@flood/element'
import * as assert from 'assert'

export const settings: TestSettings = {
  loopCount: 1,
  screenshotOnFailure: true,
  description: 'By.js - Execute Javascript',
  actionDelay: 2,
  stepDelay: 2,
  disableCache: true,
  clearCookies: true,
  chromeVersion: 'stable',
  ignoreHTTPSErrors: true,
  waitTimeout: '5000',
}

/**
 * Execute Javascript Example using By.js
 * Version: 1.0
 */
export default () => {
  step('Execute Javascript: Example 1', async (browser) => {
    //Please Note: ReCAPTCHA must be in TEST Mode
    await browser.visit('https://the-internet.herokuapp.com/javascript_alerts')

    //Validate text
    let validation = By.visibleText('JavaScript Alerts')
    await browser.wait(Until.elementIsVisible(validation))

    //lets run the jsAlert js function
    try {
      await browser.page.evaluate('jsAlert()')
      //console.log(result)
    } catch {}

    const result = await browser.page.evaluate('document.readystate')
    console.log(result)

    await browser.wait(5)

    await browser.takeScreenshot()
  })
}
