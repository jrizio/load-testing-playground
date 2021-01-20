import {
  step,
  TestSettings,
  Until,
  By,
  MouseButtons,
  Device,
  Driver,
  ENV,
  Key,
} from '@flood/element'

export const settings: TestSettings = {
  loopCount: 1,
  description: 'Double Click Example 2 - Flood Element',
  actionDelay: 2.5,
  stepDelay: 2.5,
  clearCache: true,
  disableCache: true,
  clearCookies: true,
  chromeVersion: 'stable',
  waitTimeout: 60,
  ignoreHTTPSErrors: true,
}

/**
 * Double Click Example - Flood Element
 * Authored by Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  step('Double Click: Home', async (browser) => {
    //Navigate to the Double Click checkbox example page
    await browser.visit(
      'https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-1/checkbox-1.html',
      {
        waitUntil: 'load',
        timeout: 90000,
      },
    )

    //Verify that we are on the correct page
    let pageVerify = By.xpath("//h1[contains(text(),'Checkbox Example')]")
    await browser.wait(Until.elementIsVisible(pageVerify))
  })

  step('Double Click: Click', async (browser) => {
    const selector = '#ex1 > div > ul > li:nth-child(1) > div'

    const rect = await browser.page.evaluate((selector) => {
      const element = document.querySelector(selector)
      if (!element) return null
      const { x, y } = element.getBoundingClientRect()
      return { x, y }
    }, selector)

    if (rect) {
      await browser.page.mouse.click(rect.x, rect.y, {
        clickCount: 1,
        delay: 100,
      })
      await browser.page.mouse.click(rect.x, rect.y, {
        clickCount: 1,
        delay: 100,
      })
    } else {
      console.error('Element Not Found')
    }

    await browser.wait(10)
  })
}
