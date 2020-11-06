import { step, TestSettings, By, Until } from '@flood/element'

export const settings: TestSettings = {
  waitUntil: 'visible',
  stepDelay: 2.5,
  actionDelay: 2.5,
  loopCount: 1,
  screenshotOnFailure: true,
  waitTimeout: 30000,
  clearCache: true,
  disableCache: true,
  //chromeVersion: 'stable',
  launchArgs: ['--window-size=1920,1080'],
}

export default () => {
  step('Open Page - Set Viewport', async (browser) => {
    await browser.page.setViewport({ width: 0, height: 0 })
    await browser.visit('https://wordpress.loadtest.io/')
  })
}
