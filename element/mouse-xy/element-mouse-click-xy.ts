import { step, TestSettings, Until, By } from '@flood/element'

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

export default () => {
  step('Canvas Example: Home', async (browser) => {
    await browser.visit(
      'http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple',
    )

    const pageTextVerify = By.visibleText('Simple Drawing Canvas Demo')
    await browser.wait(Until.elementIsVisible(pageTextVerify))

    await browser.wait(10)

    let inputCanvas = By.xpath("//canvas[contains(@id, 'canvasSimple')]")
    await browser.mouse.click(537, 203, inputCanvas)

    //await browser.mouse.down(550, 280, inputCanvas)
    await browser.mouse.drag([550, 280], [662, 309])

    await browser.wait(10)

    await browser.takeScreenshot()
  })
}
