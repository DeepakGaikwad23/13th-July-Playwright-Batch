import {test, expect} from '@playwright/test'

test ('Flipkart - Galaxy s24 Search Flow', async ({page, context})=>
{
await page.goto("https://www.flipkart.com/");

//handle Login Popup
await page.getByRole('button', { name: '✕' }).click();

//Search for Galaxy S24
const searchBox = page.locator("(//input[@type='text' and @name='q'])[1]")

await searchBox.fill("Galaxy S24");

await page.waitForTimeout(2000);

//All Autosuggestion
const suggestions = page.locator('form div').filter({hasText: /Galaxy S24/i});

const suggestionCount = await suggestions.count();

console.log("Number of auto-suggestions:", suggestionCount)

//Visible Autosuggestion
const suggestionItems = page.locator('div[role="option"],li').filter({hasText: /Galaxy S24/i});

const count = await suggestionItems.count();

console.log("Visible suggestions:" ,count)

for (let i = 0; i < await suggestionItems.count(); i++) {
    console.log(i,await suggestionItems.nth(i).innerText()
    );
}

//Click on first Autosuggetion
await suggestionItems.nth(0).click();

//wait for Search Results
await page.waitForLoadState('domcontentloaded');

//Click on 1st product listing
const firstproduct = page.locator('a[href*="/p/"]').nth(0);

await expect(firstproduct).toBeVisible({timeout: 5000});

//handle new tab
const [newPage] = await Promise.all([context.waitForEvent('page'),firstproduct.click()]);

await newPage.waitForLoadState('domcontentloaded');

//Print product Title
const productTitle= await newPage.locator('h1').nth(0).innerText();

console.log('Product Title:',productTitle);

//Verify product title is not empty

expect(productTitle.trim()).not.toBe('');


});