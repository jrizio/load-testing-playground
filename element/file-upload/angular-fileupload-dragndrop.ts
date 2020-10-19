import { step, TestSettings, Until, By } from '@flood/element'

export const settings: TestSettings = {
	loopCount: 1,
	description: 'Angular File Upload - Drag n Drop Demo',
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
 * File Upload - Example
 * https://github.com/puppeteer/puppeteer/issues/2946
 */

export default () => {
	step('Angular File Upload - home', async (browser) => {
		//Navigate to the SAP Fiori Demo Application
		await browser.visit('https://angular-file-upload.appspot.com/', {
			waitUntil: 'load',
			timeout: 90000,
		})
	})

	step('Angular File Upload - File Upload', async (browser) => {
		//use the browser page object
		const page = (browser as any).page

		//do file upload and trigger the 'change' event
		await page.waitForSelector('input[type=file]')
		const fileInput = await page.$('input[type=file]')
		await fileInput.uploadFile('jordan-unsplash.jpg')
		await fileInput.evaluate((upload) =>
			upload.dispatchEvent(new Event('change', { bubbles: true })),
		)

		//click on Submit
		let btnSubmit = By.xpath("//button[contains(text(),'Submit')]")
		let element1 = await browser.findElement(btnSubmit)
		await element1.click()

		//wait until 100% upload completion
		let pageUploadVerify = By.xpath("//div[contains(text(),'100%')]")
		await browser.wait(Until.elementIsVisible(pageUploadVerify))

		//Take a screenshot
		await browser.takeScreenshot()
	})
}
