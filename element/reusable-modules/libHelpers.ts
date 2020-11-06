import { By } from '@flood/element'

export class helpers {
  async clickObj_ByXpath(browser, object_property: string) {
    const obj_nm = await browser.findElement(By.xpath(object_property))
    await obj_nm.click()
    console.log('Attempted to click on ' + object_property)
  }
}
