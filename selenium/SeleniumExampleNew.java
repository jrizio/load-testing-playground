import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WebDriverException;

import org.openqa.selenium.JavascriptExecutor;

import org.openqa.selenium.remote.Augmenter;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.util.Date;
import java.text.SimpleDateFormat;

import org.openqa.selenium.support.ui.Select;

import io.flood.selenium.FloodSump;

import java.io.File;
import java.util.List;
import java.util.Random;

public class SeleniumExampleNew {

    public static void takeSnapShot(WebDriver webdriver, String fileWithPath) throws Exception {
        // Convert web driver object to TakeScreenshot
        TakesScreenshot scrShot = ((TakesScreenshot) webdriver);
        // Call getScreenshotAs method to create image file
        File SrcFile = scrShot.getScreenshotAs(OutputType.FILE);
        // Move image file to new destination
        File DestFile = new File(fileWithPath);
        // Copy file at destination
        FileUtils.copyFile(SrcFile, DestFile);
    }

    public static void main(String[] args) throws Exception {

        int iterations = 0;

        /*
         * Create a new instance of the html unit driver Notice that the remainder of
         * the code relies on the interface, not the implementation.
         */
        WebDriver driver = new RemoteWebDriver(new URL(
                "http://" + System.getenv("WEBDRIVER_HOST") + ":" + System.getenv("WEBDRIVER_PORT") + "/wd/hub"),
                DesiredCapabilities.chrome());
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Use an implicit wait for all object identification
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

        /* Create a new instance of the Flood IO agent */
        FloodSump flood = new FloodSump();

        /* Inform Flood IO the test has started */
        flood.started();

        /* It's up to you to control test duration / iterations programatically. */
        while (iterations < 1000) {
            try {

                // navigate to the home page
                flood.start_transaction("wordpress.loadtest.io - Home");
                driver.get("https://wordpress.loadtest.io");
                flood.passed_transaction(driver, "wordpress.loadtest.io - Home");

                // click on Accessories link
                flood.start_transaction("wordpress.loadtest.io - Accessories");
                driver.findElement(By.xpath("//img[contains(@alt, 'Accessories')]")).click();
                // verify expected page is returned
                driver.findElement(By.xpath("//*[contains(text(),'Accessories')]"));
                flood.passed_transaction(driver, "wordpress.loadtest.io - Accessories");

                // click on Add to Cart link for the Beanie product
                flood.start_transaction("wordpress.loadtest.io - Add Item to Cart");
                driver.findElement(By.xpath("//a[contains(@data-product_id, '35')]")).click();
                // verify expected page is returned
                driver.findElement(By.xpath("//*[contains(text(),'has been added to your cart.')]"));
                flood.passed_transaction(driver, "wordpress.loadtest.io - Add Item to Cart");

                // click on View Cart
                flood.start_transaction("wordpress.loadtest.io - View Cart");
                driver.findElement(By.xpath("//a[contains(@href, '/cart/')]")).click();
                // verify expected page is returned
                driver.findElement(By.xpath("//*[contains(text(),'Cart totals')]"));
                flood.passed_transaction(driver, "wordpress.loadtest.io - View Cart");

                // click on Proceed to Checkout
                flood.start_transaction("wordpress.loadtest.io - Go to Checkout");
                driver.findElement(By.xpath("//a[contains(@class, 'checkout-button')]")).click();
                // verify expected page is returned
                driver.findElement(By.xpath("//*[contains(text(),'Your order')]"));
                flood.passed_transaction(driver, "wordpress.loadtest.io - Go to Checkout");

                // fill out details
                flood.start_transaction("wordpress.loadtest.io - Checkout Form Entry");
                // first name
                driver.findElement(By.xpath("//input[contains(@name, 'billing_first_name')]")).sendKeys("Load");
                // surname
                driver.findElement(By.xpath("//input[contains(@name, 'billing_last_name')]")).sendKeys("Tester");

                // country
                Select lstCountry = new Select(
                        driver.findElement(By.xpath("//select[contains(@name, 'billing_country')]")));
                lstCountry.selectByVisibleText("United States (US)");

                // street address
                driver.findElement(By.xpath("//input[contains(@name, 'billing_address_1')]"))
                        .sendKeys("100 Performance Way");

                // town / city
                driver.findElement(By.xpath("//input[contains(@name, 'billing_city')]")).sendKeys("Loadville");

                // state
                Select lstState = new Select(
                        driver.findElement(By.xpath("//select[contains(@name, 'billing_state')]")));
                lstState.selectByVisibleText("California");
                // driver.findElement(By.xpath("//select[contains(@name,
                // 'billing_state')]")).selectByVisibleText("California");

                // zip code - billing_postcode
                driver.findElement(By.xpath("//input[contains(@name, 'billing_postcode')]")).sendKeys("90210");

                // phone - billing_phone
                driver.findElement(By.xpath("//input[contains(@name, 'billing_phone')]")).sendKeys("8004771477");

                // phone - billing_email
                driver.findElement(By.xpath("//input[contains(@name, 'billing_email')]")).sendKeys("me@loadtest.io");

                // date object
                Date date1 = new Date();
                SimpleDateFormat sdf1 = new SimpleDateFormat("MMddyyyyhmmss");
                String formattedDateTime1 = sdf1.format(date1);

                // take screenshot
                takeSnapShot(driver, "/data/flood/results/form-entry-" + formattedDateTime1 + ".png");
                flood.passed_transaction(driver, "wordpress.loadtest.io - Checkout Form Entry");

                // finally click the checkout button
                flood.start_transaction("wordpress.loadtest.io - Checkout");
                driver.findElement(By.xpath("//button[contains(@id, 'place_order')]")).click();
                // verify expected page is returned
                driver.findElement(By.xpath("//*[contains(text(),'Thank you. Your order has been received.')]"));

                // date object for screenshot
                Date date2 = new Date();
                SimpleDateFormat sdf2 = new SimpleDateFormat("MMddyyyyhmmss");
                String formattedDateTime2 = sdf2.format(date2);

                // take screenshot
                takeSnapShot(driver, "/data/flood/results/order-final-" + formattedDateTime2 + ".png");
                flood.passed_transaction(driver, "wordpress.loadtest.io - Checkout");

                iterations++;

                /* Good idea to introduce some form of pacing / think time into your scripts */
                Thread.sleep(4000);

            } catch (WebDriverException e) {
                String[] lines = e.getMessage().split("\\r?\\n");
                System.err.println("Webdriver exception: " + lines[0]);
                flood.failed_transaction(driver);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                String[] lines = e.getMessage().split("\\r?\\n");
                System.err.println("Browser terminated early: " + lines[0]);
            } catch (Exception e) {
                String[] lines = e.getMessage().split("\\r?\\n");
                System.err.println("Other exception: " + lines[0]);
            } finally {
                iterations++;
            }
        }

        driver.quit();

        /* Inform Flood IO the test has finished */
        flood.finished();
    }
}