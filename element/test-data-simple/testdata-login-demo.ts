import { step, TestSettings, Until, By, TestData } from "@flood/element";
import { random, name, internet, address } from "faker";


export const settings: TestSettings = {
  loopCount: 5,
  clearCache: true,
  disableCache: true,
  actionDelay: 2.5,
  stepDelay: 2.5,
  screenshotOnFailure: true,
  chromeVersion: 'stable',
  ignoreHTTPSErrors: true,
  waitTimeout: 60,
}

interface UserData {
    username: string
    password: string
  }
  
  // Load the test data.
  TestData.fromCSV<UserData>('testdata-login-demo.csv')
  .circular()

export default () => {
  
  //navigate to login page
  step("Home", async (browser) => {
    await browser.visit(
      "https://www.w3schools.com/howto/howto_css_login_form.asp"
      )

    const pageTextVerify = By.visibleText('How TO - Login Form')
    await browser.wait(Until.elementIsVisible(pageTextVerify))

  })

  step("Click on login button to show form", async (browser) => {

		//click Login button
		let btnLogin = By.xpath("//button[contains(text(),'Login')]")
		let element1 = await browser.findElement(btnLogin)
        await element1.click()

  })

  step("Enter Username and Password", async (browser, data: UserData) => {

		//Enter the username
		let input_username = By.xpath("//input[contains(@placeholder, 'Enter Username')]")
		let element1 = await browser.findElement(input_username)
		await element1.type(data.username)

		//Enter the password
		let input_password = By.xpath("//input[contains(@placeholder, 'Enter Password')]")
		let element2 = await browser.findElement(input_password)
    await element2.type(data.password)
    await browser.wait(5)
})


}
