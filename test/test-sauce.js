const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo Automation Test', function () {
    let driver;

    it('Success Login dan Sort Product A-Z', async function () {
        let options = new chrome.Options();

        driver = await new Builder()
            .forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.id('login-button'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        let buttonCart = await driver.wait(
            until.elementLocated(
                By.xpath('//*[@data-test="shopping-cart-link"]')
            ),
            10000
        );

        await driver.wait(
            until.elementIsVisible(buttonCart),
            5000,
            'Shopping cart harus tampil'
        );

        const isDisplayed = await buttonCart.isDisplayed();
        assert.strictEqual(isDisplayed, true);

        let textAppLogo = await driver.findElement(By.className('app_logo'));

        let logoText = await textAppLogo.getText();

        assert.strictEqual(logoText, 'Swag Labs');

        await driver.sleep(1500);

        let dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'));
        await dropdownSort.sendKeys('Name (A to Z)');
        let firstProduct = await driver.findElement(By.className('inventory_item_name'));
        let firstProductText = await firstProduct.getText();

        assert.strictEqual(
            firstProductText,
            'Sauce Labs Backpack'
        );

        await driver.sleep(2000);

        await driver.quit();
    });
});