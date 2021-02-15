import { step, TestSettings, Until, By } from '@flood/element'
import * as assert from 'assert'

export const settings: TestSettings = {
  loopCount: -1,
  screenshotOnFailure: true,
  description: 'Test - Live Stream',
  actionDelay: 8,
  stepDelay: 8,
  disableCache: true,
  clearCookies: true,
  chromeVersion: 'stable',
  waitTimeout: 60,
  //browser: 'firefox',
}

/**
 * Watch Live Stream
 * Version: 1.0
 */
export default () => {
  step('Home', async (browser) => {
    await browser.visit('https://www.youtube.com/watch?v=wbEBtIKIsAk')

    let pageTextVerify = By.visibleText('How to make your own slime')
    await browser.wait(Until.elementIsVisible(pageTextVerify))

    await browser.takeScreenshot()
  })

  step('Home: Click Play', async (browser) => {
    //play the video
    let obj_btn_Play = By.xpath('//*[@id="movie_player"]/div[4]/button')
    await browser.wait(Until.elementIsVisible(obj_btn_Play))
    let element7 = await browser.findElement(obj_btn_Play)
    await element7.click()

    await browser.takeScreenshot()
  })

  for (var i = 1; i < 30; i++) {
    //waits a while viewing the video stream
    step('Watch Video Stream' + i, async (browser) => {
      await browser.wait(20)
      await browser.takeScreenshot()
    })
  }
}
