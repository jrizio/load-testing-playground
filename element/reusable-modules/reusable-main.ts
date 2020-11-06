import { step, TestSettings, By } from '@flood/element'
import { helpers } from './libHelpers.ts'

export const settings: TestSettings = {
  loopCount: 1,
  description: 'Reusable Component Example',
  screenshotOnFailure: true,
  disableCache: true,
  clearCache: true,
  clearCookies: true,
  actionDelay: 8.5,
  stepDelay: 8.5,
  chromerVersion: 'stable',
  waitUntil: 'visible',
}

export default () => {
  step('Start - launch browser and application', async (browser) => {
    // visit instructs the browser to launch, open a page, and navigate to https://test.salesforce.com
    await browser.visit('https://test.salesforce.com/')
    await browser.takeScreenshot()
  })

  // browser keyword can be shorthanded as "b" or anything that is descriptive to you.
  step('Enter username', async (b) => {
    const usernm = await b.findElement(By.xpath('//input[@id="username"]'))
    await usernm.sendKeys('test@test.com')
  })

  // Enter password
  step('Enter Password', async (b) => {
    const pswd = await b.findElement(By.xpath('//input[@id="password"]'))
    await pswd.sendKeys('Password1')
  })

  step('step 4 click login button', async (browser) => {
    //declare the helper class
    const reusable = new helpers()
    //use the helper class to click the login button
    reusable.clickObj_ByXpath(browser, "//input[@type='submit']")
    console.log('clicked on submit button')
    browser.wait(10)
  })
}
