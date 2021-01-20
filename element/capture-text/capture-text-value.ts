import { setup, step, TestSettings, By, Until } from '@flood/element'

export const settings: TestSettings = {
  disableCache: true,
  clearCache: true,
  clearCookies: true,
  actionDelay: 2,
  stepDelay: 2,
  loopCount: 1,
  waitUntil: 'visible',
  chromeVersion: 'stable',
}

export default () => {
  setup({ waitTimeout: 100 })
  step('Open Flood Store Page', async (browser) => {
    await browser.visit('https://wordpress.loadtest.io/shop/')
    await browser.takeScreenshot()
    await browser.wait(
      Until.elementIsVisible(By.xpath('//*[@id="main"]/header/h1')),
    )
  })

  step('Get Beanie Price', async (browser) => {
    //declare the full text object CSS selector
    let objBeaniePriceText =
      '#main > ul > li.post-35.product.type-product.status-publish.has-post-thumbnail.product_cat-accessories.first.instock.sale.shipping-taxable.purchasable.product-type-simple > a.woocommerce-LoopProduct-link.woocommerce-loop-product__link > span.price > ins > span'

    //find the text CSS selector within the page
    await browser.wait(Until.elementIsVisible(By.css(objBeaniePriceText)))
    let valueBeaniePrice = await browser.findElement(By.css(objBeaniePriceText))

    //save the text value to a string
    let BeaniePrice = await valueBeaniePrice.text()

    //output the text value to the console log
    console.log('The Beanie price is: ' + BeaniePrice)

    /*
    let objDate =
      '#body > div.main-contentarea > footer > div > div > div > div > div.col-md-3.footer-content__wrapper__subcription.footer-content__wrapper_tab.pull-right > div > div > div:nth-child(5) > strong > span'

    //find the text CSS selector within the page
    await browser.wait(Until.elementIsVisible(By.css(objDate)))
    let objDateText = await browser.findElement(By.css(objDate))

    //save the text value to a string
    let myDate = await objDateText.text()

    //ALL CONTENT © ONLINEMETALS.COM 1999-2020. ALL RIGHTS RESERVED.
    let outputValue = myDate.match(
      new RegExp('1999-' + '(.*)' + '. ALL RIGHTS RESERVED'),
    )
    //output the year we want 2020
    console.log('My year: ' + outputValue[1])
    */
  })
}
