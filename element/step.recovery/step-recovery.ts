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
 * step.recovery example
 * AUTHORED BY: Jason Rizio (jason@flood.io)
 * Version: 1.0
 */

export default () => {
  
  //go to an invalid URL which will fail the step
  step("Step 1", async (browser) => {
   await browser.visit("https://wordprezz.loadtest.io")
  })

  step.recovery('Step 1', { recoveryTries: 1 }, async (browser) => {
   console.log("Step 1 (local recovery) step initiated")
   return RecoverWith.RETRY
  })

}
