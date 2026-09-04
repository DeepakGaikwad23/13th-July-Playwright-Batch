import {test,expect} from '@playwright/test'

test ('facebook test case', async ({page})=>
{
    await page.goto("https://www.facebook.com/");

    //Identify email address and phone number field, aslo send some text
    await page.getByLabel('Email address or mobile number').fill("test@test.com");

    await page.getByText('Email address or mobile number').fill('deepak@test.com')

})

test("practice all playwright locator methods", async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/shopkart-practice.html");

    //By alt text
    await page.getByAltText('Profile photo').click();

    //by Place Holder
    await page.getByPlaceholder('Enter your full name').fill("Deepak Gaikwad");

    //By Label
    await page.getByLabel('Email address').fill("deepak.bdf@gmail.com");

    //By Title
    await page.getByTitle('Read our privacy policy').click();

    //By TestId
    await page.getByTestId('password-strength').click();

    //Based on text
    await page.getByText('Your details are never shared with sellers').click();

    //based on role
    await page.getByRole("button",{name:"Create account"}).click();

    //based on role:with multiple matches
    await page.getByRole("button",{name:"Add to Cart"}).click();

})

test("practicing xpath on our html", async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/shopkart-practice.html");

    //using ID
    await page.locator("//input[@id='pincode']").fill("400706");

    //using other attributes pair other than ID
    await page.locator("//input[@placeholder='House no, street']").fill("Ram Niwas");

    //using multiple attributes value pair combination
    await page.locator("//input[@name='city'][@placeholder='City']").fill("mumbai");

    //using text method
    await page.locator('//span[text()="Home"]').click();

    //using naormalize space + indexing
    await page.locator('//div[normalize-space()="Same Day"]').click();

    //using contains method
    await page.locator('//input[contains(@id,"coupon_")]').fill("test");

    //parent to child
    await page.locator('//span[@class="info-icon"]/span').click();

    //using following sibling
    await page.locator('//td[text()="Laptop"]/following::td[1]').click();

    //using preceding sibling
    await page.locator('//td[text()="25000"]//preceding-sibling::td[1]').click();


})