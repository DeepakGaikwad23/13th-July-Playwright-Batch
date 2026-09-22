import { test } from '@playwright/test';

test('Browser, BrowserContext and Page example', async ({ browser }) => {

    // 1. Browser
    const context = await browser.newContext();

    // 2. Browser Context
    const page = await context.newPage();

    // 3. Page
    await page.goto('https://www.google.com');

    console.log('Page title:', await page.title());

    await context.close();
});

test('Multiple Brow Contexts', async ({ browser }) => {

//Context 1

const context1 = await browser.newContext();
const page1 = await context1.newPage();
await page1.goto('https://www.google.com');
console.log('Page title from context 1:', await page1.title());

//Context 2
const context2 = await browser.newContext();
const page2 = await context2.newPage();
await page2.goto('https://www.bing.com');
console.log('Page title from context 2:', await page2.title());

await context1.close();
await context2.close();

})