import { step, TestSettings, Until, By } from '@flood/element'
import * as assert from 'assert'

export const settings: TestSettings = {
  loopCount: 1,
  screenshotOnFailure: true,
  description: 'Page Authentication',
  actionDelay: 2,
  stepDelay: 2,
  disableCache: true,
  clearCookies: true,
  chromeVersion: 'stable',
  ignoreHTTPSErrors: true,
  extraHTTPHeaders: { Authorization: 'Basic aHR0cHdhdGNoOmY=' },
}

/**
 * Flooded.io Authentication
 * Version: 1.0
 */
export default () => {
  step('Authentication: Home', async (browser) => {
    await browser.visit('https://www.httpwatch.com/httpgallery/authentication/')

    //Click Display Image button
    let btnDisplayImage = await browser.findElement(
      By.xpath('//*[@id="displayImage"]'),
    )
    await btnDisplayImage.click()

    //check if the protected image is displayed
    //*[@id="downloadImg"]
    let protectedImage = await (
      await browser.findElement(By.xpath('//*[@id="downloadImg"]'))
    ).isDisplayed()

    if (protectedImage == true) {
      console.log(
        'The image has been displayed after authentication successful.',
      )
    } else {
      console.log(
        'The image was NOT displayed after authentication successful.',
      )
    }

    await browser.takeScreenshot()
  })
}
