const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('SauceDemo Automation Test', function () {
    let driver;

    before(async function () {
        console.log('membuka browser sebelum test dijalankan');
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        console.log('menutup browser setelah test selesai');
        await driver.quit();
    });

    it('Success Login', async function () {
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

        await driver.sleep(2000);
    });

    it('Sort Product A-Z', async function () {
        await driver.get('https://www.saucedemo.com');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.id('login-button'));

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        await driver.wait(until.elementLocated(
        By.xpath('//select[@data-test="product-sort-container"]')),
         10000
        );

        let dropdownSort = await driver.findElement(
            By.xpath('//select[@data-test="product-sort-container"]')
        );

        await dropdownSort.sendKeys('Name (A to Z)');

        let firstProduct = await driver.findElement(
            By.className('inventory_item_name')
        );

        let firstProductText = await firstProduct.getText();

        assert.strictEqual(
            firstProductText,
            'Sauce Labs Backpack'
        );

        await driver.sleep(2000);
    });
});