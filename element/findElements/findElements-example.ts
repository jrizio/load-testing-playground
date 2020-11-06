import { step, TestSettings, Until, By, RecoverWith } from '@flood/element'

export const settings: TestSettings = {
  loopCount: 1,
  clearCache: true,
  disableCache: true,
  clearCookies: true,
  actionDelay: 2,
  stepDelay: 2,
  screenshotOnFailure: true,
  chromeVersion: 'stable',
  ignoreHTTPSErrors: true,
}

/**
 * .findElements example
 * AUTHORED BY: Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  //visit the page with all the Add to cart buttons
  step('Visit Demo page - findElements', async (browser) => {
    await browser.visit(
      'https://wordpress.loadtest.io/product-category/hoodies/',
    )
  })

  step('get all Add to Cart buttons - findElements', async (browser) => {
    //retrieve the number of Add to cart buttons
    const rows = await browser.findElements(
      By.xpath("//a[contains(text(),'Add to cart')]"),
    )
    console.log('rows length ', rows.length)
  })

  step('find 0 elements - findElements', async (browser) => {
    //let's purposefully find 0 objects
    try {
      const rows = await browser.findElements(
        By.xpath("//a[contains(text(),'Add to cartz')]"),
      )
      console.log('rows length ', rows.length)

      if (rows.length > 0) {
        console.log('we found at least 1 object')
      } else {
        console.log('no objects found, ignore')
      }
    } catch (error) {
      console.log('we caught an error')
    }
  })
}
