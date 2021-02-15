import { step, TestSettings, Until, By } from '@flood/element'

export const settings: TestSettings = {
  loopCount: 1,
  description: 'The Flood Store - Simple Tutorial',
  screenshotOnFailure: true,
  disableCache: true,
  clearCache: true,
  clearCookies: true,
  actionDelay: 9.5,
  stepDelay: 9.5,
}

/**
 * The Flood Store
 * Version: 2.0
 */
export default () => {
  step('The Flood Store: Home', async (browser) => {
    await browser.visit('https://wordpress.loadtest.io/')

    const pageTextVerify = By.visibleText('Welcome to the Flood Store')
    await browser.wait(Until.elementIsVisible(pageTextVerify))

    await browser.takeScreenshot()
  })

  step('The Flood Store: Click Hoodies', async (browser) => {
    const lnkHoodies = await browser.findElement(By.partialLinkText('Hoodies'))
    await lnkHoodies.click()

    const pageTextVerify = By.visibleText('Hoodie with Logo')
    await browser.wait(Until.elementIsVisible(pageTextVerify))

    await browser.takeScreenshot()
  })

  step('The Flood Store: Add To Cart', async (browser) => {
    const addHoodieToCart = await browser.findElement(
      By.xpath('//a[@data-product_id=39]'),
    )
    await addHoodieToCart.click()

    await browser.takeScreenshot()
  })

  step('The Flood Store: View Cart', async (browser) => {
    await browser.visit('https://wordpress.loadtest.io/cart')

    const pageTextVerify1 = By.visibleText('Free shipping')
    await browser.wait(Until.elementIsVisible(pageTextVerify1))

    const pageTextVerify2 = By.visibleText('Hoodie with Logo')
    await browser.wait(Until.elementIsVisible(pageTextVerify2))

    await browser.takeScreenshot()
  })
}
