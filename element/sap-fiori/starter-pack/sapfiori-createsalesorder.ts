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
import { waitForNetworkIdle } from './sapfiori-helpers.ts'

export const settings: TestSettings = {
  loopCount: 1,
  description: 'Quickstart Demo App - SAP Fiori',
  actionDelay: 2.5,
  stepDelay: 2.5,
  clearCache: true,
  disableCache: true,
  clearCookies: true,
  chromeVersion: 'stable',
  waitTimeout: 60,
  ignoreHTTPSErrors: true,
  launchArgs: ['--disable-features=IsolateOrigins,site-per-process'],
}

/**
 * SAP - Create Sales Order Example
 * Authored by Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  step('SAP Fiori: Home', async (browser) => {
    //Navigate to the SAP Fiori Demo Application
    await browser.visit('https://<your-sap-instance.com>', {
      waitUntil: 'load',
      timeout: 90000,
    })

    //Verify that we are on the correct page by checking that 'Recently Viewed Items' text is shown on the page
    let pageVerify = By.xpath("//span[contains(text(),'Log On')]")
    await browser.wait(Until.elementIsVisible(pageVerify))

    //Take a screenshot
    await browser.takeScreenshot()
  })

  step('SAP Fiori: Enter User Details', async (browser) => {
    //Enter the username
    let input_username = By.xpath(
      "//input[contains(@id, 'USERNAME_FIELD-inner')]",
    )
    let element1 = await browser.findElement(input_username)
    await element1.type('sapuser')

    //Enter the password
    let input_password = By.xpath(
      "//input[contains(@id, 'PASSWORD_FIELD-inner')]",
    )
    let element2 = await browser.findElement(input_password)
    await element2.type('P4$$w0rd')

    //Take a screenshot
    await browser.takeScreenshot()
  })

  step('SAP Fiori: Logon', async (browser) => {
    //click LogOn button
    let btn_LogOn = By.xpath("//span[contains(text(),'Log On')]")
    let element3 = await browser.findElement(btn_LogOn)
    await element3.click()

    //wait for navigation and inflight network requests
    await browser.page.waitForNavigation({
      timeout: 90000,
      waitUntil: 'load',
    })

    //verify we are on teh correct page after login
    let pageVerify = By.xpath("//span[contains(@id, '__tile3-title-inner')]")
    await browser.wait(Until.elementIsVisible(pageVerify))

    //Take a screenshot
    await browser.takeScreenshot()
  })

  step('SAP Fiori: Click Sales Orders Group', async (browser) => {
    //find and click the Sales Orders button
    let btn_SalesOrders = By.xpath("//div[contains(text(),'Sales Orders')]")
    let element3 = await browser.findElement(btn_SalesOrders)
    await element3.click()

    //wait for page network to become idle and then continue
    const page = (browser as any).page
    await waitForNetworkIdle(page, 500)

    //Take a screenshot
    await browser.takeScreenshot()
  })

  step('SAP Fiori: Click Create Sales Order', async (browser) => {
    //navigate directly to the Create Sales Order page
    await browser.visit(
      'https://<your-sap-instance.com>>/flp?sap-client=100&sap-language=EN#SalesDocument-create?sap-ui-tech-hint=GUI',
    )

    //wait for page network to become idle and then continue
    const page = (browser as any).page
    await waitForNetworkIdle(page, 2500)

    //Take a screenshot
    await browser.takeScreenshot()
  })

  step('SAP Fiori: Sales Order Details - Entry', async (browser) => {
    //As the Sales Order objects are contained within an IFRAME - lets switch to it
    const page = (browser as any).page
    const frameSalesDocument = page
      .frames()
      .find((frame) => frame.name().includes('itsframe1'))

    //Enter Sales Document Type
    const inputSDType = await frameSalesDocument.$(
      '[title="Sales Document Type"]',
    )
    await inputSDType.type('ZOR')
    //await browser.type(inputSDType, 'ZOR')

    //Sales Organization
    const inputSalesOrg = await frameSalesDocument.$(
      '[title="Sales Organization"]',
    )
    await inputSalesOrg.type('AU01')

    //Distribution Channel
    const inputDistributionChannel = await frameSalesDocument.$(
      '[title="Distribution Channel"]',
    )
    await inputDistributionChannel.type('02')

    //Division
    const inputDivision = await frameSalesDocument.$('[title="Division"]')
    await inputDivision.type('01')

    //Sales Office
    const inputSalesOffice = await frameSalesDocument.$(
      '[title="Sales Office"]',
    )
    await inputSalesOffice.type('AU01')

    //Sales Group
    const inputSalesGroup = await frameSalesDocument.$('[title="Sales Group"]')
    await inputSalesGroup.type('A01')

    //take a screenshot
    await browser.takeScreenshot()
  })

  step('SAP Fiori: Sales Order Details - Click Continue', async (browser) => {
    //As the Sales Order objects are contained within an IFRAME - lets switch to it
    const page = (browser as any).page
    const frameSalesDocument = page
      .frames()
      .find((frame) => frame.name().includes('itsframe1'))

    //Click Continue
    const btnContinue = await frameSalesDocument.$('[title="Continue (Enter)"]')
    await btnContinue.click()

    //wait for page network to become idle and then continue
    await waitForNetworkIdle(page, 500)

    //Take a screenshot
    await browser.takeScreenshot()
  })

  step(
    'SAP Fiori: Sales Order Details - Materials Line Entry',
    async (browser) => {
      //As the Sales Order objects are contained within an IFRAME - lets switch to it
      const page = (browser as any).page
      const frameSalesDocument = page
        .frames()
        .find((frame) => frame.name().includes('itsframe1'))

      //Enter Sold-to Party
      const inputSoldToParty = await frameSalesDocument.$(
        '[title="Sold-to party"]',
      )
      await inputSoldToParty.type('1000000')
      await browser.sendKeys(Key.TAB)

      //Enter Ship-to Party
      const inputShipToParty = await frameSalesDocument.$(
        '[title="Ship-to party"]',
      )
      await inputShipToParty.type('1000000')
      await browser.sendKeys(Key.TAB)

      //Customer Reference
      const inputCustomerRef = await frameSalesDocument.$(
        '[title="Customer Reference"]',
      )
      await inputCustomerRef.type('12345')
      await browser.sendKeys(Key.TAB)

      //Create item
      const btnCreateItem = await frameSalesDocument.$('[title="Create item "]')
      await btnCreateItem.click()

      //Add Item Material code
      const row1col2 = await frameSalesDocument.$("span[id*='[1,2]_c-r']")
      await row1col2.click()
      await browser.sendKeys('1000000000', Key.TAB)

      //Add Item quantity
      const row1col4 = await frameSalesDocument.$("span[id*='[1,4]_c-r']")
      await row1col4.click()
      await browser.sendKeys('2', Key.TAB)

      //Add Customer Material Number
      const row1col8 = await frameSalesDocument.$("span[id*='[1,8]_c-r']")
      await row1col8.click()
      await browser.sendKeys('1000000000', Key.TAB)

      //Take a screenshot
      await browser.takeScreenshot()
    },
  )

  step('SAP Fiori: Save Sales Order', async (browser) => {
    //As the Sales Order objects are contained within an IFRAME - lets switch to it
    const page = (browser as any).page
    const frameSalesDocument = page
      .frames()
      .find((frame) => frame.name().includes('itsframe1'))

    //Save (Cmd S)
    const btnSave = await frameSalesDocument.$('[title="Save (Cmd S)"]')
    await btnSave.click()

    //wait for page network to become idle and then continue
    await waitForNetworkIdle(page, 500)

    //wait for Sales Order response text
    await frameSalesDocument.waitForSelector('span[id*="sbar_msg-txt"]')
    let objMsgBar = await frameSalesDocument.$('span[id*="sbar_msg-txt"]')
    const SalesOrderText = await (
      await objMsgBar.getProperty('textContent')
    ).jsonValue()

    //output the Sales Order number and associated text
    console.log(SalesOrderText)

    //Take a screenshot
    await browser.takeScreenshot()
  })
}
