import { step, TestSettings, Until, By } from "@flood/element";
import { random, name, internet, address } from "faker";


export const settings: TestSettings = {
  loopCount: 1,
  clearCache: true,
  disableCache: true,
  actionDelay: 2.5,
  stepDelay: 2.5,
  screenshotOnFailure: true,
  chromeVersion: 'stable',
  ignoreHTTPSErrors: true,
  waitTimeout: 60,
}

/**
 * Open a PDF in new tab and measure the download response time
 * Authored by Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  //visit our PDF link example site
  step("Home", async (browser) => {
    await browser.visit(
      "http://165.232.50.173/index.php/pdf-link-example/"
      )

  //verify text on page
  const pageTextVerify = By.visibleText('PDF Link Example')
  await browser.wait(Until.elementIsVisible(pageTextVerify))

  })

  step("Click on link and wait for PDF to download", async (browser) => {

    //click on PDF link
    let linkPDF = By.xpath("//a[contains(text(),'pdf.pdf')]")
    let element1 = await browser.findElement(linkPDF)
    await element1.click()

    //wait for the pdf to load and close tab
    const newTab = await browser.waitForNewPage()
    await newTab.waitFor('*')
    newTab.close()

  })


}
