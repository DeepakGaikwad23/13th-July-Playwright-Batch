import {test,expect} from '@playwright/test'

test("emply test 1",async ({page})=>
{

})

test("emply test 2",async ({page})=>
{

})

test("emply test 3",async ({page})=>
{

})

test('get page title',async({page})=>
{
    await page.goto("https://www.flipkart.com/");

    const title= await page.title();
    console.log("Title is:",title);
    await expect(page).toHaveTitle("Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!");
})

test('get second page title',async({page})=>
{
    await page.goto("https://www.google.com");

    const title= await page.title();
    console.log("Title is:",title);
    await expect(page).toHaveTitle("Google");
})