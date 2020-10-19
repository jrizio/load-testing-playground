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

export default () => {
  step("Home", async (browser) => {
    await browser.visit(
      "http://165.232.50.173/index.php/pdf-link-example/"
      )

    const pageTextVerify = By.visibleText('PDF Link Example')
    await browser.wait(Until.elementIsVisible(pageTextVerify))

  })

  step("Click on link and wait for PDF to download", async (browser) => {

    const newPagePromise = (browser as any).newPagePromise

    //click on pdf link
    let linkPDF = By.xpath("//a[contains(text(),'pdf.pdf')]")
    let element1 = await browser.findElement(linkPDF)
    await element1.click()

    //wait for pdf to load and close tab
    const newPage = await newPagePromise
    await newPage.waitFor('*')
    newPage.close()

  })


}
